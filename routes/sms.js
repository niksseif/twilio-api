const express = require('express');
const Twilio = require('twilio');
const dotEnv = require('dotenv');

dotEnv.config();

const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);


// client.messages.create({
//   to: '',
//   from: '',
//   body: 'this is dr K',
// }).then(message => console.log(message.sid, '<<message.sid'));


const createMsg = (doctorName, patientName, date, time, customMsg) => (
  `Hello ${patientName},\nThis is Dr. ${doctorName}'s office reminding you about your appointment on ${date} at ${time}.${customMsg ? `\nNOTE: ${customMsg}` : ''}`
);

router.post('/', (req, res) => {
  res.header('Content-Type', 'application/json');
  const {
    phoneNumber, doctorName, patientName, date, time, customMsg,
  } = req.body;
  const apptMessage = createMsg(doctorName, patientName, date, time, customMsg);

  client.messages.create({
    body: apptMessage,
    to: phoneNumber,
    from: process.env.TWILIO_NUMBER,
  })
    // .then(message => res.send(message));
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

module.exports = { router, createMsg };
