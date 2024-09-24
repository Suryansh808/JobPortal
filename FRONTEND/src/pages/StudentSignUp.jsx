import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../api';
import { BsArrowLeftCircle } from "react-icons/bs";

const StudentSignUp = () => {
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState(""); // Added fullname state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

   const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image",image);
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phone", phone);

        const checkUserResponse = await API.post("/check-user", {phone});


      // const sendOtpResponse = await API.post("/send-otp", formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

     if (!checkUserResponse.data.exists) {
    
      //  const sendOtpResponse =  await API.post("/send-otp", { fullname, phone, email});
      
      const sendOtpResponse = await API.post("/send-otp", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
       console.log('Send OTP Response:', sendOtpResponse.data);
       if (sendOtpResponse.data.success) {
        if (sendOtpResponse.data.userId) {
          // Store the user ID in local storage
          localStorage.setItem("userId", sendOtpResponse.data.userId);
          localStorage.setItem("userID", sendOtpResponse.data.id);
        }
        setIsOtpSent(true);
      } else {
        console.error("Failed to send OTP:", sendOtpResponse.data.message);
      }
      } else {
        alert("User already exists. Please log in.");
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
        navigate("/Resume");
      } else {
        alert("OTP verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="w-full h-screen animated-login flex items-center justify-center flex-col">
      <div className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8">
      <Link to='/Recruitment' className="text-white flex items-center justify-end"><BsArrowLeftCircle /></Link>
        <h2 className="text-center text-4xl font-extrabold text-white">Welcome</h2>
        <p className="text-center text-gray-200">Sign up for a new account</p>
        <form onSubmit={isOtpSent ? handleOtpVerification : handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="file"
               accept="image/*"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              required
              id="imageUrl"
              name="imageUrl"
              onChange={handleImageUpload}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="imageUrl"
            >
              Upload Image
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Provide Full Name"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              required
              id="fullname"
              name="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="fullname"
            >
              Full Name
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="john@example.com"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              required
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="email"
            >
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Phone"
              className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
              required
              id="phone"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
              htmlFor="phone"
            >
              Phone Number
            </label>
          </div>
          {isOtpSent && (
            <div className="relative">
              <input
                placeholder="OTP"
                className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                required
                id="otp"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <label
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                htmlFor="otp"
              >
                Verify OTP
              </label>
            </div>
          )}
          <button
            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
            type="submit"
          >
            {isOtpSent ? "Verify OTP" : "Sign Up"}
          </button>
        </form>
        <div className="text-center text-gray-300">
          Already have an account?
          <Link className="text-purple-300 hover:underline" to="/StudentLogIn">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentSignUp;
