import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";

const AdminLogInPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/otp-send', { email });
      setIsOtpSent(true);
      setError('');
    } catch (err) {
      setError('You are not Admin');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('OTP is required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/otp-verify', { email, otp });
      setIsOtpVerified(true);
      navigate('/AdminDashboard');
      setError('');
    } catch (err) {
      setError('Failed to verify OTP');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 rounded-2xl bg-white shadow-md">
        <h2 className="text-2xl text-center text-black font-bold py-4">Admin LogIn</h2>
        <div className="flex flex-col gap-4 p-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
          />
          {isOtpSent && (
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
            />
          )}
          <button
            onClick={isOtpSent ? handleVerifyOtp : handleSendOtp}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            {isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </button>
          {isOtpVerified && (
            <p className="text-green-500">Logged in successfully!</p>
          )}
          {error && (
            <p className="text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogInPage;
