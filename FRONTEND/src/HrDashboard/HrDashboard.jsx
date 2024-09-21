// import React, { useState } from "react";
// import HrProfile from "./HrProfile";
// import HrCompanyJob from "./HrCompanyJob";
// import HrJobPost from "./HrJobPost";
// import ApplicantList from "./HrApplicantList";
// import SelectedByCompany from "./HrSelectedByCompany";
// import RejectedByCompany from "./HrRejectedByCompany";
// import SelectedApplicant from "./HrSelectedApplicant";
// import RejectedApplicant from "./HrRejectedApplicant";
// import HiredCandidate from "./HrHiredCandidate";
// import RecruitmentFooter from "../Recruitment/RecruitmentFooter";
// const HrPDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeComponent, setActiveComponent] = useState("Profile");

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const renderContent = () => {
//     switch (activeComponent) {
//       case "Profile":
//         return <HrProfile />;
//       case "CompanyJob":
//         return <HrCompanyJob/>;
//       case "HrJobPost":
//         return <HrJobPost/>;
//       case "ApplicantList":
//         return <ApplicantList/>;
//       case "SelectedByCompany":
//         return <SelectedByCompany/>;
//       case "RejectedByCompany":
//         return <RejectedByCompany/>
//       case "SelectedApplicant":
//         return <SelectedApplicant/>
//       case "RejectedApplicant":
//         return <RejectedApplicant/>
//       case "HiredCandidate":
//         return <HiredCandidate/>
//       default:
//       return <HrProfile />;
//     }
//   };

//   return (
//     <div id="AdminDashboard" className="min-h-screen flex flex-col">
//       <header className="bg-gray-800 text-white h-[5vh] p-4 flex justify-between items-center position-sticky">
//         <h1 className="text-xl">HR</h1>
//         <button
//           className="bg-blue-500 text-white  rounded"
//           onClick={toggleSidebar}
//         >
//           Menu
//         </button>
//       </header>

 
//       <div className="flex-1 flex">

//         <div
//           className={`fixed top-[5vh] right-0  bg-gray-800 text-white w-60 transform ${
//             isSidebarOpen ? "translate-x-0" : "translate-x-full"
//           } transition-transform duration-300 ease-in-out z-50`}
//         >
//           <button
//             className="text-xl p-4 text-right w-full"
//             onClick={toggleSidebar}
//           >
//             &times;
//           </button>
//           <ul className="p-4">
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("Profile");
//                 toggleSidebar();
//               }}
//             >
//               PROFILE
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("CompanyJob");
//                 toggleSidebar();
//               }}
//             >
//               COMPANY JOBS
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("HrJobPost");
//                 toggleSidebar();
//               }}
//             >
//               JOB POST
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("ApplicantList");
//                 toggleSidebar();
//               }}
//             >
//               APPLICANT LIST
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("SelectedByCompany");
//                 toggleSidebar();
//               }}
//             >
//               SELECTED BY COMPANY
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("RejectedByCompany");
//                 toggleSidebar();
//               }}
//             >
//               REJECTED BY COMPANY
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("SelectedApplicant");
//                 toggleSidebar();
//               }}
//             >
//               SELECTED APPLICANT
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("RejectedApplicant");
//                 toggleSidebar();
//               }}
//             >
//               REJECTED APPLICANT
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("HiredCandidate");
//                 toggleSidebar();
//               }}
//             >
//               HIRED CANDIDATE
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//             >
//               LOGOUT
//             </li>
//           </ul>
//         </div>

//         {/* Content Area */}
//         <div className="flex-1 p-6 ">{renderContent()}</div>
//       </div>
//       <RecruitmentFooter/>
//     </div>
//   );
// };

// export default HrPDashboard;


import React, { useState } from "react";
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


const HrPDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Profile");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('HrName'); // Remove HR name from localStorage
    alert("Logged out successfully");
    navigate('/HrLogin'); // Redirect to the login page
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "Profile":
        return <HrProfile />;
      case "CompanyJob":
        return <HrCompanyJob />;
      case "HrJobPost":
        return <HrJobPost />;
      case "ApplicantList":
        return <ApplicantList />;
      case "SelectedByCompany":
        return <SelectedByCompany />;
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

  return (
    <div id="AdminDashboard" className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white h-[5vh] p-4 flex justify-between items-center position-sticky">
        <h1 className="text-xl">HR</h1>
        <button
          className="bg-blue-500 text-white  rounded"
          onClick={toggleSidebar}
        >
          Menu
        </button>
      </header>

      <div className="flex-1 flex">
        <div
          className={`fixed top-[5vh] right-0  bg-gray-800 text-white w-60 transform ${
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
                setActiveComponent("Profile");
                toggleSidebar();
              }}
            >
              PROFILE
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("CompanyJob");
                toggleSidebar();
              }}
            >
              COMPANY JOBS
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("HrJobPost");
                toggleSidebar();
              }}
            >
              JOB POST
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("ApplicantList");
                toggleSidebar();
              }}
            >
              APPLICANT LIST
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("SelectedByCompany");
                toggleSidebar();
              }}
            >
              SELECTED BY COMPANY
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("RejectedByCompany");
                toggleSidebar();
              }}
            >
              REJECTED BY COMPANY
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("SelectedApplicant");
                toggleSidebar();
              }}
            >
              SELECTED APPLICANT
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("RejectedApplicant");
                toggleSidebar();
              }}
            >
              REJECTED APPLICANT
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("HiredCandidate");
                toggleSidebar();
              }}
            >
              HIRED CANDIDATE
            </li>
            <li
              className="mb-4 cursor-pointer"
               onClick={handleLogout} // Add onClick event
            >
              LOGOUT
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 ">{renderContent()}</div>
      </div>
      <RecruitmentFooter />
    </div>
  );
};

export default HrPDashboard;
