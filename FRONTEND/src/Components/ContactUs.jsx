import React, { useRef, useState } from 'react';
import NewNavbar from "../Components/Newnavbar";
import Footer from "../Components/Footer";
import gif from '../assets/contactus.gif';
import axios from 'axios';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const formRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit', formData);
      formRef.current.reset();
      alert('Data submitted successfully!');
     
      // Reset form or perform other actions
    } catch (error) {
      alert('Error submitting data');
    }
  };
  return (
    <>
    <NewNavbar/>
    <div className=" text-darkText">
      <div className="flex items-center bg-white">
      <div className='w-1/2  py-2 px-2'>
          <img src={gif} alt="" className="" />
         </div>
        <div className='w-1/2  py-2 px-2 contect-us-form'>  
        <form ref={formRef} className="px7 grid justify-center items-center" onSubmit={handleSubmit}>
      <div className="grid gap-6" id="form">
        <div className="w-full flex gap-3">
          <input
            className="capitalize rounded-md shadow-2xl p-3 ex w-full outline-none placeholder:text-black"
            type="text"
            placeholder="First Name"
            id="First-Name"
            name="firstName"
            required
            onChange={handleChange}
          />
          <input
            className="p-3 capitalize rounded-md shadow-2xl glass w-full placeholder:text-black outline-none"
            type="text"
            placeholder="Last Name"
            id="Last-Name"
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-6 w-full">
          <input
            className="p-3 shadow-2xl rounded-md glass w-full placeholder:text-black outline-none"
            type="email"
            placeholder="Email"
            id="Email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex gap-3">
          <textarea
            placeholder="Message.."
            name="message"
            className="p-3 rounded-md glass shadow-2xl w-full placeholder:text-black outline-none"
            onChange={handleChange}
            required
          />
        </div>
        <button className="outline-none rounded-md glass shadow-2xl w-full p-3 text-black h font-bold" type="submit">
          Submit
        </button>
      </div>
    </form>
        </div>
         
      </div>

      <div className='flex'>
      <div className="w-1/2 h-[50vh] py-2 px-2 ">
          <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.6537362823756!2d77.65306337491643!3d12.865627087440128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6d696e67880f%3A0x5b9a53aa71b83daa!2sKrutanic%20Solutions!5e0!3m2!1sen!2sin!4v1722075393049!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='w-1/2 h-[50vh] py-2 px-2'>
      <p>  45 BC, a Latin professor at Hampden-Sydney College in Virginia</p>
      Phone : <a href="mailto:+91 976885083">+91 976885083</a> <br />
      Email :          <a href="mailto:vivek.mengu016@gmail.com">vivek.mengu016@gmail.com</a>


        </div>
      </div>
     
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;