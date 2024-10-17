import React, { useEffect, useState} from "react";
import JobList from "./JobList";
import AllApplicationStatus from "./AllApplicationStatus";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";
import ResumePreview from "../Components/ResumePreview";
import Resume from "../Components/Resume";
import { useNavigate } from "react-router-dom";



const NotificationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const [jobApplications, setJobApplications] = useState([]);
 // Function to fetch job applications from the API
 const fetchJobApplications = async () => {
    try {
      const userId = localStorage.getItem("userObjectId"); // Get userId from local storage
      console.log("Retrieved userId:", userId);
      if (!userId) {
        throw new Error("userId not found in local storage");
      }

      const response = await axios.get(
        `http://localhost:5000/api/applications`,
        {
          params: { userId: userId },
        }
      );
      const applications = response.data;
      console.log("Applications data:", applications);
      if (response.status === 200) {
        const userApplications = applications.filter(
          (app) => app.userId._id === userId
        );
        setJobApplications(userApplications);
        console.log("notification data ", userApplications);
        if (userApplications.length > 0) {
          setSelectedApplication(userApplications[0]);
        }
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <p>Your notifications will appear here.</p>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-[#000000d0] text-white px-4 py-2 rounded hover:bg-[#000]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };




const StudentDashboard = () => {
  const [activeView, setActiveView] = useState("jobList");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem('userObjectId');
        console.log(userId);
        
        if (userId) {
          // Fetch user data from backend
          const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
          console.log("user data",response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userObjectId');
    localStorage.removeItem('resumeId');
    navigate('/StudentLogIn');
  }

  const [resumeDetails, setResumeDetails] = useState(null); 
    useEffect(() => {
        const fetchResumeDetails = async () => {
          try {
            const userID = localStorage.getItem('userObjectId');
            if (userID) {
              const response = await axios.get(`http://localhost:5000/api/application/${userID}`);
              setResumeDetails(response.data);
              console.log(resumeDetails);
            }
          } catch (error) {
            console.error('Error fetching resume details:', error);
          }
        };
    
        fetchResumeDetails();
      }, []);
  
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content Section */}
      <div className="flex-1 bg-white w-40">
      <div className="w-full h-16  bg-black border-b">
        <div className="flex justify-between items-center capitalize p-4">
            <h1>{userData?.fullname}'s DashBoard</h1>
           <div className=" relative">
           <IoIosNotifications className="text-2xl cursor-pointer" onClick={handleNotificationClick} />
           <span className="text-white px-2 absolute -top-3 -right-2 rounded-full bg-red-800 ">0</span>
           </div>
        </div>
        <NotificationModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      {activeView === "jobList" ? <JobList /> : activeView === "allApplicationStatus" ? <AllApplicationStatus /> : activeView === "viewResume" ? <ResumePreview resumeDetails={resumeDetails}/> : <Resume resumeDetails={resumeDetails}/>}
      </div>
      {/* Sidebar Section */}
      <div className="w-60 rounded-tl-2xl border-l bg-[#000] text-[#fff] shadow-md px-3 py-3">
        <div className="flex justify-center items-center py-1 flex-col gap-1">
      {userData?.imageUrl && (
        <img
          src={userData.imageUrl}
        //   alt="Profile"
          className="h-40 w-40 rounded-full bg-cover"
        />
      )}
      <p className="text-md font-semibold capitalize">{userData?.fullname}</p>
      <a href={`mailto:${userData?.email}`} className="text-md font-semibold ">{userData?.email}</a>
      <a href={`tel:+${userData?.phone}`} className="text-md font-semibold ">{userData?.phone}</a>
          </div>
        <ul className="space-y-4 mt-3 text-gray-200">
          <li >
            <button
            className="hover:scale-110 ease-linear  duration-300  cursor-pointer flex items-center justify-center gap-1.5 w-[13vw] px-4 py-2 bg-[#ffff] bg-opacity-80 text-[#000] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl"
              onClick={() => setActiveView("jobList")}
            >
              Jobs
            </button>
          </li>
          <li >
            <button
              className="hover:scale-110 ease-linear  duration-300 cursor-pointer flex items-center justify-center gap-1.5  w-[13vw] px-2 py-2 bg-[#ffff] bg-opacity-80 text-[#000] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl"
              onClick={() => setActiveView("allApplicationStatus")}
            >
              All Application Status
            </button>
          </li>
          <li>
            <button
              className="hover:scale-110 ease-linear  duration-300  cursor-pointer flex items-center justify-center gap-1.5 w-[13vw] px-4 py-2 bg-[#ffff] bg-opacity-80 text-[#000] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl"
              onClick={()=> setActiveView("viewResume")}

            >
              View resume
            </button>
          </li>
          {/* <li >
            <button
              className="hover:scale-110 ease-linear  duration-300  cursor-pointer flex items-center justify-center gap-1.5 w-[13vw] px-4 py-2 bg-[#ffff] bg-opacity-80 text-[#000] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl"
              onClick={() => setActiveView("editResume")}
            >
              Edit your resume
            </button>
          </li> */}
          <li onClick={handleLogOut} >
          <button  className="hover:scale-110 ease-linear  duration-300 w-[13rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-red-700 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">Log Out</button>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
