// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminProfile from "./AdminProfile";
// import AdminControlMain from "./AdminContMain";
// import AdminControlCareer from "./AdminContCareer";
// import AdminCompanyJobs from "./AdminCompanyJobs";
// import HRUpdates from "./AdminHrList";
// import Candidate from "./AdminCandidates";
// import  AdminCompany from "./AdminCompany";
// import RecruitmentFooter from "../Recruitment/RecruitmentFooter";
// import AssignedToHr from "./AssignedToHr";



// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeComponent, setActiveComponent] = useState("Profile");

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const renderContent = () => {
//     switch (activeComponent) {
//       case "Profile":
//         return <AdminProfile />;
//       case "CONTROL-MAIN":
//         return <AdminControlMain/>;
//       case "CONTROL-CAREER":
//         return <AdminControlCareer/>;
//       case "PostJobs":
//         return <AdminCompanyJobs/>;
//       case "AsignedToHr":
//         return <AssignedToHr/>;
//       case "HRupdates":
//         return <HRUpdates/>;
//         case "Candidate":
//           return <Candidate/>
//           case "AdminCompany":
//             return <AdminCompany/>
//         default:
//         return <AdminProfile />;
//     }
//   };

//   const navigate = useNavigate();
//   const handleLogout =()=>{
//     navigate('/AdminLogInPage')
//   }

//   return (
//     <div id="AdminDashboard" className="min-h-screen flex flex-col">
//       <header className="bg-gray-800 text-white h-[5vh] p-4 flex justify-between items-center position-sticky">
//         <h1 className="text-xl">ADMIN</h1>
//         <button
//           className="bg-blue-500 text-white  rounded"
//           onClick={toggleSidebar}
//         >
//           Menu
//         </button>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex">
//         {/* Sidebar */}
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
//                 setActiveComponent("CONTROL-MAIN");
//                 toggleSidebar();
//               }}
//             >
//               CONTROL-MAIN
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("CONTROL-CAREER");
//                 toggleSidebar();
//               }}
//             >
//               CONTROL-CAREER
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("PostJobs");
//                 toggleSidebar();
//               }}
//             >
//               COMPANY JOBS
//             </li>
//             <li
//               className="mb-4 cursor-pointer uppercase"
//               onClick={() => {
//                 setActiveComponent("AsignedToHr");
//                 toggleSidebar();
//               }}
//             >
//               Assigned to hr's
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("HRupdates");
//                 toggleSidebar();
//               }}
//             >
//               HR LIST
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("Candidate");
//                 toggleSidebar();
//               }}
//             >
//               USER LIST
//             </li>
//             <li
//               className="mb-4 cursor-pointer"
//               onClick={() => {
//                 setActiveComponent("AdminCompany");
//                 toggleSidebar();
//               }}
//             >
//               COMPANY LIST
//             </li>
//             <li
//               className="mb-4 cursor-pointer"onClick={handleLogout}
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

// export default AdminDashboard;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProfile from "./AdminProfile";
import AdminControlMain from "./AdminContMain";
import AdminControlCareer from "./AdminContCareer";
import AdminCompanyJobs from "./AdminCompanyJobs";
import HRUpdates from "./AdminHrList";
import Candidate from "./AdminCandidates";
import AdminCompany from "./AdminCompany";
import RecruitmentFooter from "../Recruitment/RecruitmentFooter";
import AssignedToHr from "./AssignedToHr";
import Chathistory from "./Chathistory";
import ChatHistorySidebar from "./ChatHistorySidebar"; // Import the new component


const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHrSidebarOpen, setIsHrSidebarOpen] = useState(false); // New state for HR sidebar
  const [activeComponent, setActiveComponent] = useState("Profile");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleHrSidebar = () => {
    setIsHrSidebarOpen(!isHrSidebarOpen);
  };
  const handleHrClick = (hrId) => {
    // Perform action when HR name is clicked (e.g., open a chat window or navigate to another page)
    console.log(`HR with ID ${hrId} clicked`);
    // You can navigate to a new page or perform any action here
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "Profile":
        return <AdminProfile />;
      case "CONTROL-MAIN":
        return <AdminControlMain />;
      case "CONTROL-CAREER":
        return <AdminControlCareer />;
      case "PostJobs":
        return <AdminCompanyJobs />;
      case "AsignedToHr":
        return <AssignedToHr />;
      case "HRupdates":
        return <HRUpdates />;
      case "Candidate":
        return <Candidate />;
      case "AdminCompany":
        return <AdminCompany />;
      case "Chat History":
        return <Chathistory />;
      default:
        return <AdminProfile />;
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/AdminLogInPage");
  };

  return (
    <div id="AdminDashboard" className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white h-[5vh] p-4 flex justify-between items-center position-sticky">
        <h1 className="text-xl">ADMIN</h1>
        <button
          className="bg-blue-500 text-white rounded"
          onClick={toggleSidebar}
        >
          Menu
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
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
                setActiveComponent("CONTROL-MAIN");
                toggleSidebar();
              }}
            >
              CONTROL-MAIN
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("CONTROL-CAREER");
                toggleSidebar();
              }}
            >
              CONTROL-CAREER
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("PostJobs");
                toggleSidebar();
              }}
            >
              COMPANY JOBS
            </li>
            <li
              className="mb-4 cursor-pointer uppercase"
              onClick={() => {
                setActiveComponent("AsignedToHr");
                toggleSidebar();
              }}
            >
              Assigned to hr's
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("HRupdates");
                toggleSidebar();
              }}
            >
              HR LIST
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("Candidate");
                toggleSidebar();
              }}
            >
              USER LIST
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("AdminCompany");
                toggleSidebar();
              }}
            >
              COMPANY LIST
            </li>
            <li
              className="mb-4 cursor-pointer"
              onClick={() => {
                setActiveComponent("Chat History");
                toggleSidebar();
                toggleHrSidebar(); // Open HR sidebar on Chat History click
              }}
            >
              CHAT HISTORY
            </li>
            <li className="mb-4 cursor-pointer" onClick={handleLogout}>
              LOGOUT
            </li>
          </ul>
        </div>

        {/* HR Sidebar */}
        <div
          className={`fixed top-[5vh] right-0 bg-gray-800 text-white w-60 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <button className="text-xl p-4 text-right w-full" onClick={toggleSidebar}>
            &times;
          </button>
          <ul className="p-4">
           
            {/* <li className="mb-4 cursor-pointer" onClick={toggleHrSidebar}>CHAT HISTORY</li> Trigger HR sidebar */}
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">{renderContent()}</div>
        {isHrSidebarOpen && <ChatHistorySidebar onHrClick={handleHrClick} />}
      </div>

      <RecruitmentFooter />
    </div>
  );
};

export default AdminDashboard;