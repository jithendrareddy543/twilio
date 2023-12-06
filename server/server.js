const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Twilio credentials from .env
const accountSid = '';
const authToken = '';
const client = new twilio(accountSid, authToken);

// Generate and send OTP
app.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via Twilio SMS
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: '',// get from .env
      to: phoneNumber,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});