const express = require('express');
const Twilio = require('twilio');
const dotEnv = require('dotenv');

dotEnv.config();

const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);


const msg = (officeName, clientName, date, time) => (
  `Hello ${clientName},This is ${officeName}'s office reminding you about your appointment on ${date} at ${time}.`
);

router.post('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  const {
    phoneNumber, officeName, clientName, date, time,
  } = req.body;
  const apptMessage = msg(officeName, clientName, date, time);

  client.messages.create({
    body: apptMessage,
    from: process.env.TWILIO_NUMBER,
    to: phoneNumber,
  })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

module.exports = { router, msg };
