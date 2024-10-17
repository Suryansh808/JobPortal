import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../api';
import { BsArrowLeftCircle } from "react-icons/bs";
import WaterDropGrid from "../Owner/WaterDropGrid";


const StudentLogIn = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API.post("/check-user", { phone });
      if (response.data.exists) {
        const sendOtpResponse = await API.post("/send-otp", { phone ,email });
        console.log(sendOtpResponse.data);
        if (sendOtpResponse.data.success) {
          if (sendOtpResponse.data.userId) {
            // Store the user ID in local storage
            localStorage.setItem("userId", sendOtpResponse.data.userId);
            localStorage.setItem("userObjectId", sendOtpResponse.data.id);
          }
          setIsOtpSent(true); } 
      } else {
        alert("User does not exist. Please sign up.");
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    try {
      const response = await API.post("/verify-otp", { phone, otp });
      if (response.data.success) {
        navigate("/StudentDashBoard");
      } else {
        alert("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="w-full h-screen animated-login flex items-center justify-center flex-col">
      <div className="absolute z-[1000] max-w-md w-full bg-[#ffffff17] backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
      <Link to='/Recruitment' className="text-white flex items-center justify-end"><BsArrowLeftCircle /></Link>
        <h2 className="text-center text-4xl font-extrabold text-white">Welcome</h2>
        <p className="text-center text-gray-200">Log in to your account</p>
        <form onSubmit={isOtpSent ? handleOtpVerification : handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none "
              required
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5  peer-focus:text-sm"
              htmlFor="email"
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Phone"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none "
              required
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5  peer-focus:text-sm"
              htmlFor="phone"
            >
              Phone Number
            </label>
          </div>
          {isOtpSent && (
            <div className="relative">
              <input
                placeholder="OTP"
                className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none "
                required
                id="otp"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5  peer-focus:text-sm"
                htmlFor="otp"
              >
                Verify OTP
              </label>
            </div>
          )}
          <button
            className="w-full py-2 px-4 bg-gradient-to-r from-[#000000] to-[#00000059] rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit"
          >
            {isOtpSent ? "Verify OTP" : "Log In"}
          </button>
        </form>
        <div className="text-center text-gray-300">
          Don't have an account?
          <Link className="text-gray-300 ml-2 hover:underline" to="/StudentSignUp">Sign up</Link>
        </div>
      </div>
      <WaterDropGrid/>
    </div>
  );
};

export default StudentLogIn;
