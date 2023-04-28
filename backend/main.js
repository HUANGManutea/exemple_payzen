require('dotenv').config();

const express = require("express");
const axios = require('axios').default;
const cors = require('cors');
const bodyParser = require('body-parser');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const sha1 = require('crypto-js/sha1');
const Base64 = require('crypto-js/enc-base64');
const Hex = require('crypto-js/enc-hex');
const Utf8 = require ('crypto-js/enc-utf8');

const app = express();
const port = 9447;

// middlewares
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const apiRestBaseUrl = process.env.PAYZEN_REST_BASE_URL;
const payzenRestUser = process.env.PAYZEN_REST_USER;
const payzenRestPassword = process.env.PAYZEN_REST_PASSWORD;
const payzenRestValidationKey = process.env.PAYZEN_REST_VALIDATION_KEY;
const payzenFormCertificate = process.env.PAYZEN_FORM_CERTIFICATE;
const payzenFormSignatureAlgorithm = process.env.PAYZEN_FORM_SIGNATURE_ALGORITHM;

// auth Token for REST API implementation
const authToken = Base64.stringify(Utf8.parse(`${payzenRestUser}:${payzenRestPassword}`));

// get validation hash for REST API implementation
const computeValidationHash = (data) => {
  return Hex.stringify(hmacSHA256(JSON.stringify(data), payzenRestValidationKey))
}

// signature for FORM implementation
const computeFormSignature = (formOrderData) => {
  let dataToSign = "";

  Object.keys(formOrderData).sort().forEach((key) => {
    if(key.startsWith('vads_')) {
      dataToSign += `${formOrderData[key]}+`;
    }
  })
  dataToSign += `${payzenFormCertificate}`;

  if (payzenFormSignatureAlgorithm === 'HMAC-SHA-256') {
    return Base64.stringify(hmacSHA256(dataToSign, payzenFormCertificate));
  }
  return Hex.stringify(sha1(dataToSign));
}

// REST

app.post("/rest/payment", (req, res) => {
  var payment = req.body;
  console.log("REST: received payment:");
  console.log(payment);

  // Call CreatePayment web service to create the form token
  axios.post(`${apiRestBaseUrl}/Charge/CreatePayment`, payment, {
    headers: {
      'Authorization': `Basic ${authToken}`,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log("REST: received data from api.secure.osb.pf :");
    console.log(response.data);
    res.send({formToken: response.data.answer.formToken});
  }).catch((error) => {
    console.error(error);
    res.status(500).json(error);
  });
});

// Validates the given payment data (hash)
app.post('/rest/validatePayment', (req, res) => {
  console.log("REST: received validation:");
  console.log(req.body);
  const answer = req.body.clientAnswer
  const hash = req.body.hash
  const answerHash = computeValidationHash(answer)
  if (hash === answerHash) {
    res.status(200).json({result: 'Valid payment'})
  } else {
    res.status(500).json({result: 'Payment hash mismatch'})
  }
})

// FORM

app.post("/form/payment", (req, res) => {
  var formOrderData = req.body;
  console.log("FORM: received formOrderData:");
  console.log(formOrderData);

   // transform data to : "VALUE_1+VALUE_2+...+VALUE_N+CERTIFICATE"
   const signature = computeFormSignature(formOrderData);
   res.send({signature: signature});
});

app.post("/form/IPN"), (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  console.log("FORM: received IPN:");
  console.log(queryObject);

  const signature = computeFormSignature(queryObject);
  if (queryObject.sign === signature) {
    res.status(200).json({result: 'Valid payment'})
  } else {
    res.status(500).json({result: 'Payment signature mismatch'})
  }
}


app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
