import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WaterDropGrid from "./WaterDropGrid";

const AdminLogInPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for the timer
  const [isTimerActive, setIsTimerActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleSendOtp = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/otp-send", { email });
      setIsOtpSent(true);
      setError("");
      setTimeLeft(90);
      setIsTimerActive(true);
    } catch (err) {
      setError("You are not Admin");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/otp-verify", { email, otp });
      setIsOtpVerified(true);
      localStorage.setItem("admin", "true");
      navigate("/AdminDashboard");
      setError("");
    } catch (err) {
      setError("Failed to verify OTP");
    }
  };

  const handleResendOtp = () => {
    handleSendOtp();
    setOtp(""); // Clear the OTP input
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      <div className="w-[35vw] absolute z-[1000] rounded-2xl bg-[#ffffff2d] backdrop-blur-sm shadow-md">
        <h2 className="text-2xl text-center text-black font-bold py-3">
          Admin LogIn
        </h2>
        <div className="flex flex-col gap-4 px-3 py-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          {isOtpSent && (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full rounded-lg border border-gray-300 bg-white text-black px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
              />
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Time left: {timeLeft}s</span>
                {timeLeft === 0 && (
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-500 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}
          <button
            onClick={isOtpSent ? handleVerifyOtp : handleSendOtp}
            className="inline-block cursor-pointer rounded-md bg-slate-900 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            {isOtpSent ? "Verify OTP" : "Send OTP"}
          </button>
          {isOtpVerified && (
            <p className="text-green-500">Logged in successfully!</p>
          )}
          
        </div>
      </div>
      <div className="">
        <WaterDropGrid/>
      </div>
    </div>
  );
};

export default AdminLogInPage;
