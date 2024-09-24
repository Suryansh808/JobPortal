import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import { BsArrowLeftCircle } from "react-icons/bs";

const CompanyLogInPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/CompanyDashBoard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", loginData);
      console.log("resp login data",res.data.companyName);
      if (res.data.success) {
        // console.log('companyName', res.data.companyName);
        console.log("login resp",res.data);
        localStorage.setItem('companyName', res.data.companyName);  
        login(res.data.token);
        alert("Login Successfully");
      } else {
        alert(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        alert(err.response.data.message || "Check your email and password");
        console.log("Server Error Message:", err.response.data.error || err.response.data.message);
      } else {
        alert("An unknown error occurred.");
        console.log("Unknown Error:", err.message);
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="max-w-md mx-auto my-10 text-blaack px-3 py-3 border rounded shadow-md">
      <Link to='/Recruitment' className="text-white flex items-center justify-end" ><BsArrowLeftCircle /></Link>
      <h1 className="text-2xl font-bold text-white text-center mb-2">Company Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          className="mb-4 p-2 w-full text-[#000000d5] border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          className="mb-4 p-2 w-full text-[#000] border rounded"
          required
        />
         <Link to="/ForgotPassword" className="text-blue-500">Forgot Password?</Link>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        <div className="flex items-center justify-center gap-3 my-3">
          Don't have an account  <Link to='/CompanySignUpPage'>SingUp</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CompanyLogInPage;


