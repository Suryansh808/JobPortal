import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WaterDropGrid from "../Owner/WaterDropGrid";

const HrLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/hr/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hrUserId: username, hrPassword: password })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Redirect to HRDashboard upon successful login
        localStorage.setItem('HrName', data.hr.hrName);
        alert("login successfull");
        navigate('/HrPDashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="h-screen w-full">
      <div className="bg-blue-800 flex items-center justify-between px-5">
        <h1 className="text-3xl font-bold text-center">HR Login</h1>
        <Link to="/">Home</Link>
      </div>
      <div className=" absolute z-[1000] flex items-center justify-center w-full mt-20">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Log in
                </p>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your username
                  </label>
                  <input
                    placeholder="JohnDoe"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="••••••••"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                  className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <WaterDropGrid/>
    </div>
  );
};

export default HrLogin;
