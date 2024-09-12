import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/send-otp", { email });
      if (res.data.success) {
        setStep(2);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
      if (res.data.success) {
        setStep(3);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/reset-password", { email, newPassword });
      if (res.data.success) {
        alert("Password successfully reset. Please log in with your new password.");
        navigate("/CompanyLoginPage");
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="max-w-md mx-auto my-10 text-black px-3 py-3 border rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password</h1>
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 w-full border rounded"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Send OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-4 p-2 w-full border rounded"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Verify OTP
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mb-4 p-2 w-full border rounded"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
