require('dotenv').config();

const express = require("express");
const axios = require('axios').default;
const cors = require('cors');
const bodyParser = require('body-parser');
const hmacSHA256 = require('crypto-js/hmac-sha256');
const Hex = require('crypto-js/enc-hex');
const Utf8 = require ('crypto-js/enc-utf8');

const app = express();
const port = 9447;

// middlewares
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

const payzenUser = process.env.PAYZEN_USER;
const payzenPassword = process.env.PAYZEN_PASSWORD;
const payzenValidationKey = process.env.PAYZEN_VALIDATION_KEY;

const authToken = Base64.stringify(Utf8.parse(`${payzenUser}:${payzenPassword}`));

// get validation hash
const computeValidationHash = (data) => {
  return Hex.stringify(hmacSHA256(JSON.stringify(data), payzenValidationKey))
}

app.post("/payment", (req, res) => {
  var payment = req.body;
  console.log("received payment:");
  console.log(payment);

  // Call CreatePayment web service to create the form token
  axios.post("https://api.secure.osb.pf/api-payment/V4/Charge/CreatePayment", payment, {
    headers: {
      'Authorization': `Basic ${authToken}`,
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    console.log("received data from api.secure.osb.pf :");
    console.log(response.data);
    res.send({formToken: response.data.answer.formToken});
  }).catch((error) => {
    console.error(error);
    res.status(500).send("error");
  });
});

// Validates the given payment data (hash)
app.post('/validatePayment', (req, res) => {
  const answer = req.body.clientAnswer
  const hash = req.body.hash
  const answerHash = Hex.stringify(
    hmacSHA256(JSON.stringify(answer), 'CHANGE_ME: HMAC SHA256 KEY')
  )
  if (hash === answerHash) res.status(200).send('Valid payment')
  else res.status(500).send('Payment hash mismatch')

  if (answer == null || hash == null) {
    // case no answer or hash
    // => don't validate
    res.status(500).send('Missing hash')
  } else {
      // compute check value
      const answerHash = computeValidationHash(answer)
      if (hash === answerHash) {
          // case matching
          res.status(200).send('Valid payment')
      } else {
          // case not matching
          res.status(500).send('Payment hash mismatch')
      }
    }
})

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
