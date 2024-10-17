import React, { useEffect, useState  , useRef } from "react";
import { useNavigate } from 'react-router-dom';
import CompanyProfile from "./CompanyProfile";
import JobPost from "./JobPost";
import HRUpdates from "./HRUpdates";
// import Candidates from "./Candidates";
import Interviews from "./Interviews";
import Payment from "./Payment";
import { useAuth } from './AuthContext';
import RejectedCandidates from "./RejectedCandidates";
import List from "./List";
import HiredCandidates from "./HiredCandidates";
import { gsap } from "gsap";
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
      // case "HRupdates":
      //   return <HRUpdates/>;
      case "List":
        return <List/>;
        // case "Candidate":
        //   return <Candidates/>
          case "Interview":
            return <Interviews/>
          case "RejectedCandidates":
            return <RejectedCandidates/>
          case "HiredCandidates":
            return <HiredCandidates/>
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
  const sidebarRef = useRef(null);
  const listItemRefs = useRef([]);

  useEffect(() => {
    if (isSidebarOpen) {
      // GSAP animation for the list items when sidebar opens
      gsap.fromTo(
        listItemRefs.current,
        { opacity: 0, x: 100 }, // Initial state
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2, // Stagger effect for each item
          ease: "power3.out",
        }
      );
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#000000] to-[#2b2a2a]">
      {/* Header */}
      <header className="bg-black h-[8vh] fixed w-full text-white p-3 flex justify-between items-center ">
        <h1 className="text-xl">Company Dashboard</h1>
        <button
          className="bg-[#1d1c1c] text-white p-2 rounded"
          onClick={toggleSidebar}
        >
          Menu
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
         <div
      ref={sidebarRef}
      className={`fixed top-[8vh] right-0 h-[92vh] border-l-slate-500 border-l rounded-l-2xl bg-[#000] text-white w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <ul className="px-2 py-4">
        {[
          { label: "Profile", action: "Profile/:companyId" },
          { label: "Post Jobs", action: "PostJobs" },
          { label: "List", action: "List" },
          { label: "Interview Update", action: "Interview" },
          { label: "Rejected candidates", action: "RejectedCandidates" },
          { label: "Hired candidates", action: "HiredCandidates" },
          { label: "Payment", action: "Payment" },
        ].map((item, index) => (
          <li
            key={item.label}
            ref={(el) => (listItemRefs.current[index] = el)}
            className="mb-4 uppercase  px-2 py-2 rounded-md text-white cursor-pointer"
            onClick={() => {
              setActiveComponent(item.action);
              toggleSidebar();
            }}
          >
            {item.label}
          </li>
         
        ))}
         <li><button onClick={handleLogout} className="text-red-800 uppercase px-2 font-bold rounded">
          Log Out
        </button></li>
      </ul>
      <div>
       
      </div>
    </div>
        <div className="flex-1 mt-14">
          {renderContent()}
          </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
