import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { BsArrowLeftCircle } from "react-icons/bs";
// import { useCompany } from "./CompanyContext";

const CompanySignUpPage = () => {
  const [formData, setFormData] = useState({
    companyLogo: null,
    companyName: "",
    // companyLocation: "",
    companyType: "",
    otherCompanyType: "",
    position: "",
    businessmodel: "",
    email: "",
    password: "",
    confirmPassword:"",
    
  });
  // const { setCompanyId } = useCompany(); // Get the setCompanyId function from context
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

 
    const handleChange = (e) => {
      const { name, value,type, files } = e.target;
    
      if (type === 'file') {
        // Handle file input
        setFormData((prevData) => ({
          ...prevData,
          companyLogo: files[0], // Store the file object
        }));
      } else {
        // Handle other input types
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };

  // const handleChangeFile = (e) => {
  //   const { files } = e.target;

  //   if (type === 'file') {
  //     // Handle file input
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: files[0], // Store the file object
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShow) => !prevShow);
  };

  const validatePasswords = () => {
    if (formData.password != formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate passwords before submitting
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
  } else {
      setError('');
  }
   // If 'Other' is selected, validate 'otherCompanyType'
   if (formData.companyType === 'Other' && !formData.otherCompanyType) {
    alert('Please specify the company type');
    return;
  }
  // Create a copy of formData without confirmPassword
  const { confirmPassword, ...dataToSubmit } = formData;
  const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      // Append files separately to FormData
      if (key === 'companyLogo' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
     const res = await axios.post("http://localhost:5000/api/signup", formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
     );

     // Store companyName in localStorage
    //  localStorage.setItem('companyName', formData.companyName);

      alert('Signup successfully');
      navigate("/CompanyLogInPage");
    } catch (err) {
      // Check error response
      if (err.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', err.response.data);
        setError(err.response.data.message || 'Signup failed');
      } else if (err.request) {
        // Request was made but no response received
        console.error('Error request:', err.request);
        setError('No response from server');
      } else {
        // Something else happened in setting up the request
        console.error('Error message:', err.message);
        setError('An error occurred');
      }
    }
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="max-w-md mx-auto text-[#000000d3] px-3 py-2 border rounded shadow-md">
       <Link to='/career' className="text-white flex items-center justify-end"><BsArrowLeftCircle /></Link>
        <h1 className="text-2xl font-bold text-white mb-3">Company Signup</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="mb-4 p-2 w-full border rounded"
            required
          />
          <input
              type="file"
              name="companyLogo"
              onChange={handleChange}
              className="mb-4 p-2 w-full border rounded"
              required
            />
          {/* <input
            type="text"
            name="companyLocation"
            placeholder="Company Location"
            value={formData.companyLocation}
            onChange={handleChange}
            className="mb-4 p-2 w-full border rounded"
            required
          /> */}
              <div>
        <select
          name="companyType"
          value={formData.companyType}
          onChange={handleChange}
          className="mb-4 p-2 w-full border rounded"
          required
        >
          <option value="" disabled>Select company type</option>
          <option value="Service-based">Service-based</option>
          <option value="Product-based">Product-based</option>
          <option value="IT">IT</option>
          <option value="Non-IT">Non-IT</option>
          <option value="Sales">Sales</option>
          <option value="Other">Other</option>
        </select>
        {formData.companyType === "Other" && (
          <input
            type="text"
            name="otherCompanyType"
            placeholder="Please specify"
            value={formData.otherCompanyType}
            onChange={handleChange}
            className="mb-4 p-2 w-full border rounded"
            required={formData.companyType === "Other"} // Only required if "Other" is selected
          />
        )}
      </div>
          <input
            type="text"
            name="position"
            placeholder="Your Position"
            value={formData.position}
            onChange={handleChange}
            className="mb-4 p-2 w-full border rounded"
            required
          />
          <textarea
            type="text"
            name="businessmodel"
            placeholder="Your Business Model"
            value={formData.businessmodel}
            onChange={handleChange}
            className="mb-4 p-2 w-full border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Company Email"
            value={formData.email}
            onChange={handleChange}
            className="mb-4 p-2 w-full border rounded"
            required
          />
          <div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePasswords}
                className="p-2 w-full border rounded"
                required
              />
              <span
                onClick={handleTogglePasswordVisibility}
                className="absolute right-3 top-3 text-2xl cursor-pointer"
              >
                {showPassword ? <IoMdEyeOff /> : <IoEye />}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={validatePasswords}
                className="p-2 w-full border rounded"
                required
              />
              <span
                onClick={handleToggleConfirmPasswordVisibility}
                className="absolute right-3 top-3 text-2xl cursor-pointer"
              >
                {showConfirmPassword ? <IoMdEyeOff /> : <IoEye />}
              </span>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
          <div className="text-white my-2 flex items-center justify-center gap-3">
            Already have an account? <Link to="/CompanyLogInPage">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySignUpPage;