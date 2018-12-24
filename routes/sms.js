const express = require('express');

const router = express.Router();

const Twilio = require('twilio');
const dotEnv = require('dotenv');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
