import React, { useState } from 'react';
import axios from 'axios';

const SendOTP = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-otp', {
        phoneNumber,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <div>
      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="text"
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
};

export default SendOTP;