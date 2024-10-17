import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import AdminProfile from "./AdminProfile";
import AdminControlMain from "./AdminContMain";
import AdminCompanyJobs from "./AdminCompanyJobs";
import HRUpdates from "./AdminHrList";
import Candidate from "./AdminCandidates";
import  AdminCompany from "./AdminCompany";
import RecruitmentFooter from "../Recruitment/RecruitmentFooter";
import AssignedToHr from "./AssignedToHr";
import Insight4 from "./insight4";
import { CiMenuFries } from "react-icons/ci";


const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Profile");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "Profile":
        return <AdminProfile />;
      case "CONTROL-MAIN":
        return <AdminControlMain/>;
      case "ManageThoughts":
        return <Insight4/>;
      case "PostJobs":
        return <AdminCompanyJobs/>;
      case "AsignedToHr":
        return <AssignedToHr/>;
      case "HRupdates":
        return <HRUpdates/>;
        case "Candidate":
          return <Candidate/>
          case "AdminCompany":
            return <AdminCompany/>
        default:
        return <AdminProfile />;
    }
  };

  const navigate = useNavigate();
  const handleLogout =()=>{
    navigate('/AdminLogInPage')
  }
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
      <header className="bg-black text-white h-[5vh] p-4 flex justify-between items-center position-sticky">
        <h1 className="text-xl">ADMIN</h1>
        <button
          className=" text-white text-2xl"
          onClick={toggleSidebar}
        >
         <CiMenuFries />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        {/* <div
          className={`fixed top-[5vh] right-0 rounded-bl-xl bg-black text-white w-60 transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
        
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
              className="mb-4 cursor-pointer uppercase"
              onClick={() => {
                setActiveComponent("ManageThoughts");
                toggleSidebar();
              }}
            >
              Manage Thoughts
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
              className="mb-4 bg-red-800 cursor-pointer"onClick={handleLogout}
            >
              LOGOUT
            </li>
          </ul>
        </div> */}
         <div
      className={`fixed top-[5vh] right-0 rounded-bl-xl bg-black text-white w-60 transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <ul className="p-4">
        {[
          { label: "PROFILE", value: "Profile" },
          { label: "CONTROL-MAIN", value: "CONTROL-MAIN" },
          { label: "Manage Thoughts", value: "ManageThoughts" },
          { label: "COMPANY JOBS", value: "PostJobs" },
          { label: "Assigned to hr's", value: "AsignedToHr" },
          { label: "HR LIST", value: "HRupdates" },
          { label: "USER LIST", value: "Candidate" },
          { label: "COMPANY LIST", value: "AdminCompany" },
        ].map((item, index) => (
          <li
            key={item.value}
            ref={(el) => (listItemRefs.current[index] = el)} // Store reference
            className="mb-4 cursor-pointer uppercase"
            onClick={() => {
              setActiveComponent(item.value);
              toggleSidebar();
            }}
          >
            {item.label}
          </li>
        ))}
        <li
          className="mb-4 text-red-800 font-bold cursor-pointer"
          onClick={handleLogout}
        >
          LOGOUT
        </li>
      </ul>
    </div>

        {/* Content Area */}
        <div className="flex-1 p-6 ">{renderContent()}</div>
      </div>
      <RecruitmentFooter/>
    </div>
  );
};

export default AdminDashboard;
