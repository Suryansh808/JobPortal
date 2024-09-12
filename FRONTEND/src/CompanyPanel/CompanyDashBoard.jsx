import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CompanyProfile from "./CompanyProfile";
import JobPost from "./JobPost";
import HRUpdates from "./HRUpdates";
import Candidates from "./Candidates";
import Interviews from "./Interviews";
import Payment from "./Payment";
import { useAuth } from './AuthContext';

const CompanyDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Profile");

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "Profile/:id":
        return <CompanyProfile />;
      case "PostJobs":
        return <JobPost/>;
      case "HRupdates":
        return <HRUpdates/>;
        case "Candidate":
          return <Candidates/>
          case "Interview":
            return <Interviews/>
          case "Payment":
            return <Payment/>
        default:
        return <CompanyProfile />;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/CompanyLoginPage');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
  };


  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 h-[8vh] text-white p-3 flex justify-between items-center">
        <h1 className="text-xl">Company Dashboard</h1>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={toggleSidebar}
        >
          Menu
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div
          className={`fixed top-[8vh] right-0 h-[92vh] bg-gray-800 text-white w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <button
            className="text-xl p-4 text-right w-full"
            onClick={toggleSidebar}
          >
            &times;
          </button>
          <ul className="p-4">
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("Profile/:companyId");
                toggleSidebar();
              }}
            >
              Profile
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("PostJobs");
                // navigate("/CompanyPanel/JobPost");
                toggleSidebar();
              }}
            >
              Post Jobs
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("HRupdates");
                // navigate("/company-dashboard/hr-updates");
                toggleSidebar();
              }}
            >
              HR Updates
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("Candidate");
                // navigate("/company-dashboard/candidates");
                toggleSidebar();
              }}
            >
              Candidates Update
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("Interview");
                // navigate("/company-dashboard/interviews");
                toggleSidebar();
              }}
            >
              Interview Update
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("Payment");
                // navigate("/company-dashboard/interviews");
                toggleSidebar();
              }}
            >
              Payment
            </li>
          </ul>
          <div>
           {/* loggedin btn code */}
           <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
        Log Out
      </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 ">
          {renderContent()}
          {/* <Routes>
            <Route path="/company/:id" element={<CompanyProfile />} />
            <Route path="/company-dashboard/post-jobs" element={<JobPost />} />
            <Route path="/company-dashboard/hr-updates" element={<HRUpdates />} />
            <Route path="/company-dashboard/candidates" element={<Candidates />} />
            <Route path="/company-dashboard/interviews" element={<Interviews />} />
          </Routes> */}
          </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
