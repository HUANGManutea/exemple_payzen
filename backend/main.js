const express = require("express");
const axios = require('axios').default;
var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/payment", (req, res) => {
  var payment = req.body;
  console.log("received payment:");
  console.log(payment);

  // Call CreatePayment web service to create the form token
  axios.post("https://api.secure.osb.pf/api-payment/V4/Charge/CreatePayment", payment, {
    headers: {
      //'Authorization': 'Basic Njk4NzYzNTc6dGVzdHBhc3N3b3JkX0RFTU9QUklWQVRFS0VZMjNHNDQ3NXpYWlEyVUE1eDdN',
      'Authorization': 'Basic NTg3Mzk5MzM6dGVzdHBhc3N3b3JkX0NHdnBNOEFyRDhMMnNlaFBPS2FyVkNjVWFGd0p4RzBwUVE3VkxtS3hNOEc4bg==',
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
  //   function (error, response, body) {
  //     console.log(body);
  //     if (body.status === "SUCCESS") {
  //       // Send back the form token to the client side
  //       res.send(body.answer.formToken);
  //     } else {
  //       // Do your own error handling
  //       console.error(body);
  //       res.status(500).send("error");
  //     }
  //   }
  // );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
