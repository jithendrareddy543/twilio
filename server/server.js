const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Twilio credentials
const accountSid = 'ACa5f13c60328ca6b6f3fc49e3562826c4'
const authToken = '636e1ef1210972540e0344125d03d836';
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
      from: '+12402521696',
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