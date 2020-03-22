const express = require('express');
const Nexmo = require('nexmo');
const cors = require('cors');
require('dotenv').config();

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
});

const app = express();

app.use(cors());

app.get('/auth', (req, res) => {
   const { number, brand = 'Vonage' } = req.query;
   nexmo.verify.request({ number, brand, code_length: 4 }, (error, result) => {
     if (error) {
       res.sendStatus(500);
       throw new Error(error);
     }
     const { request_id: requestId, status, error_text } = result;
     if (status !== '0') {
       res.sendStatus(500);
       throw new Error(error_text);
     }
     res.send(requestId);
   });
});

app.get('/validate', (req, res) => {
  const { id, code } = req.query;
   nexmo.verify.check({ request_id: id, code }, (error, result) => {
     if (error) {
       res.sendStatus(500);
       throw new Error(error);
     }
     const { status } = result;
     res.send(status);
   })
});

app.listen(5000, () => console.log('listening on port 5000'));
