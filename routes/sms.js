const express = require('express');


const Twilio = require('twilio');
const dotEnv = require('dotenv');

dotEnv.config();
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_Number;
const client = new Twilio(accountSid, authToken);

// This is the message to send to clients
const createApptMsg = (doctorName, patientName, date, time, customMsg) => (
  `Hello ${patientName},\nThis is Dr. ${doctorName}'s office reminding you about your appointment on ${date} at ${time}.${customMsg ? `\nNOTE: ${customMsg}` : ''}`
);

/* GET users listing. */
router.post('/', (req, res) => {
  const {
    phoneNumber, doctorName, patientName, date, time, customMsg,
  } = req.body;
  const apptMessage = createApptMsg(doctorName, patientName, date, time, customMsg);

  client.messages.creat({
    body: apptMessage,
    to: phoneNumber,
    from: twilioNumber,
  });
});

module.exports = router;
