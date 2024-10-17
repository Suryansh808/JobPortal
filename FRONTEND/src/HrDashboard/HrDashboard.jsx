
import React, { useState , useEffect,  useRef } from "react";

import { gsap } from "gsap";
 import { useNavigate } from 'react-router-dom';
import HrProfile from "./HrProfile";
import HrCompanyJob from "./HrCompanyJob";
import HrJobPost from "./HrJobPost";
import ApplicantList from "./HrApplicantList";
import SelectedByCompany from "./HrSelectedByCompany";
import RejectedByCompany from "./HrRejectedByCompany";
import SelectedApplicant from "./HrSelectedApplicant";
import RejectedApplicant from "./HrRejectedApplicant";
import HiredCandidate from "./HrHiredCandidate";
import RecruitmentFooter from "../Recruitment/RecruitmentFooter";
import InterViewProcessList from './InterViewProcessList';
import { CiMenuFries } from "react-icons/ci";

const HrPDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Profile");
  const [hrData, setHrData] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('HrName'); // Remove HR name from localStorage
    alert("Logged out successfully");
    navigate('/HrLogin'); // Redirect to the login page
  };
    // Fetch HR data when component mounts
    const fetchHrData = async () => {
      // Retrieve HRUser ID from local storage
      const hrName = localStorage.getItem('HrName');
      if (!hrName) {
        setError('User not logged in');
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/hr/profile/${hrName}`);
        const data = await response.json();
        if (response.ok) {
          setHrData(data[0]);
          console.log(hrData);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };
    useEffect(() => {
      fetchHrData();
      // fetchApplications();
    }, []);
    useEffect(() => {
      // fetchApplications();
  
    }, [hrData]);

  const renderContent = () => {
    switch (activeComponent) {
      case "Profile":
        return <HrProfile />;
      case "CompanyJob":
        return <HrCompanyJob />;
      // case "HrJobPost":
      //   return <HrJobPost />;
      case "ApplicantList":
        return <ApplicantList />;
      case "InterViewProcessList":
        return <InterViewProcessList/>;
        // case "SelectedByCompany":
        //   return <SelectedByCompany />;
      case "RejectedByCompany":
        return <RejectedByCompany />;
      case "SelectedApplicant":
        return <SelectedApplicant />;
      case "RejectedApplicant":
        return <RejectedApplicant />;
      case "HiredCandidate":
        return <HiredCandidate />;
      default:
        return <HrProfile />;
    }
  };
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
    <div id="AdminDashboard" className="min-h-screen flex flex-col bg-gradient-to-r from-[#000000] to-[#2b2a2a]">
      <header className="bg-black fixed w-full text-white h-[5vh] p-4 flex justify-between items-center">
      {hrData ? (
            <div>
              {/* <h2>WELCOME BACK</h2> */}
              <h4>{hrData.hrName}</h4>
          {/* <h2>Email: {hrData.hrUserId}</h2> */}
             
            </div>
          ) : (
            <p>No HR data found</p>
          )}
        <button
          className="text-2xl  text-white"
          onClick={toggleSidebar}
        >
        <CiMenuFries />
        </button>
      </header>

      <div className="flex-1 flex">
  <div
      className={`fixed top-[6vh] right-0 rounded-bl-xl bg-black text-white w-60 transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <ul className="px-3 py-3">
        {["Profile", "CompanyJob", "ApplicantList", "InterViewProcessList", "RejectedByCompany", "HiredCandidate", "SelectedApplicant", "RejectedApplicant"].map((item, index) => (
          <li
            key={item}
            ref={(el) => (listItemRefs.current[index] = el)} // Store reference
            className="mb-[5vh] px-2 cursor-pointer"
            onClick={() => {
              setActiveComponent(item);
              toggleSidebar();
            }}
          >
            {item}
          </li>
        ))}
        <li
          className="text-red-800 font-bold px-2 py-1 rounded-md cursor-pointer"
          onClick={handleLogout} // Add onClick event
        >
          Log Out
        </li>
      </ul>
    </div>
        {/* Content Area */}
        <div className="flex-1 mt-5">{renderContent()}</div>
      </div>
      <RecruitmentFooter />
    </div>
  );
};

export default HrPDashboard;
