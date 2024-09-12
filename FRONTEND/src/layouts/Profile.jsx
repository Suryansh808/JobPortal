import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import jsPDF from 'jspdf';
import { BiHomeAlt } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import JobList from "../pages/JobList";
// import { ApplicationStatusContext } from "../ApplicationStatusContext";
// import CustomizedDialogs from "./CustomizedDialogs";
// import axios from 'axios';


const drawerWidth = 280;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    position: "relative",
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function Profile() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [resumeDetails, setResumeDetails] = useState(null);

  // const { applicationStatus } = useContext(ApplicationStatusContext);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const id = localStorage.getItem('resumeId'); // Get the stored resume ID
        if (!id) throw new Error('Resume ID not found');
        const response = await fetch(`http://localhost:5001/api/StudentData/${id}`);
        const data = await response.json();
        setResumeDetails(data.StudentData);
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };

    fetchResume();
  }, []);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState();
  const [courseData, setCourseData] = useState(null);
  const [searchInput, setSearchInput] = useState();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/Job")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (item) => {
    setCourseData(item);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCourseData(filteredData.length > 0 ? filteredData[0] : null);
  };

  const location = useLocation();
  const { state: resumeData } = location;

  // const downloadPDF = () => {
  //   const doc = new jsPDF();

  //   if (resumeData?.imgFile) {
  //     const img = new Image();
  //     img.src = resumeData.imgFile;
  //     img.onload = () => {
  //       doc.addImage(imgFile, 'JPEG', 10, 10, 50, 50);
  //       doc.text(`Full Name: ${resumeData.fullName}`, 10, 70);
  //       doc.text(`Email: ${resumeData.email}`, 10, 80);
  //       doc.text(`Phone: ${resumeData.phone}`, 10, 90);
  //       doc.text(`Address: ${resumeData.address}`, 10, 100);
  //       doc.text(`Summary: ${resumeData.summary}`, 10, 110);
  //       resumeData.education.forEach((edu, index) => {
  //         doc.text(`Education ${index + 1}:`, 10, 130 + index * 30);
  //         doc.text(`Degree: ${edu.degree}`, 10, 140 + index * 30);
  //         doc.text(`Branch: ${edu.branch}`, 10, 150 + index * 30);
  //         doc.text(`CGPA: ${edu.cgpa}`, 10, 160 + index * 30);
  //         doc.text(`University: ${edu.university}`, 10, 170 + index * 30);
  //         doc.text(`Start Date: ${edu.startDate}`, 10, 180 + index * 30);
  //         if (edu.currentlyPursuing) {
  //           doc.text(`Currently Pursuing`, 10, 190 + index * 30);
  //         } else {
  //           doc.text(`End Date: ${edu.endDate}`, 10, 190 + index * 30);
  //         }
  //       });
  //       doc.text(`Experience: ${resumeData.experience}`, 10, 200 + resumeData.education.length * 30);
  //       doc.text(`Skills: ${resumeData.skills}`, 10, 210 + resumeData.education.length * 30);
  //       doc.text(`Achievement: ${resumeData.achievement}`, 10, 220 + resumeData.education.length * 30);
  //       doc.text(`Cover Letter: ${resumeData.coverLetter}`, 10, 230 + resumeData.education.length * 30);

  //       // doc.save('resume.pdf');
  //       doc.save(`${resumeData.fullName}.pdf`);
  //     };
  //   } else {
  //     doc.text(`Full Name: ${resumeData.fullName}`, 10, 10);
  //     doc.text(`Email: ${resumeData.email}`, 10, 20);
  //     doc.text(`Phone: ${resumeData.phone}`, 10, 30);
  // doc.text(`Address: ${resumeData.address}`, 10, 40);
  // doc.text(`Summary: ${resumeData.summary}`, 10, 50);
  // resumeData.education.forEach((edu, index) => {
  //   doc.text(`Education ${index + 1}:`, 10, 60 + index * 30);
  //   doc.text(`Degree: ${edu.degree}`, 10, 70 + index * 30);
  //   doc.text(`Branch: ${edu.branch}`, 10, 80 + index * 30);
  //   doc.text(`CGPA: ${edu.cgpa}`, 10, 90 + index * 30);
  //   doc.text(`University: ${edu.university}`, 10, 100 + index * 30);
  //   doc.text(`Start Date: ${edu.startDate}`, 10, 110 + index * 30);
  //   if (edu.currentlyPursuing) {
  //     doc.text(`Currently Pursuing`, 10, 120 + index * 30);
  //   } else {
  //     doc.text(`End Date: ${edu.endDate}`, 10, 120 + index * 30);
  //   }
  // });
  // doc.text(`Experience: ${resumeData.experience}`, 10, 130 + resumeData.education.length * 30);
  // doc.text(`Skills: ${resumeData.skills}`, 10, 140 + resumeData.education.length * 30);
  // doc.text(`Achievement: ${resumeData.achievement}`, 10, 150 + resumeData.education.length * 30);
  // doc.text(`Cover Letter: ${resumeData.coverLetter}`, 10, 160 + resumeData.education.length * 30);

  //     // doc.save('resume.pdf');
  //     doc.save(`${resumeData.fullName}.pdf`);
  //   }
  // };

  const navigate = useNavigate();

  const handleEditResume = () => {
    const resumeData = JSON.parse(localStorage.getItem('ResumeData')) || {};

    navigate('/Resume', { state: { resumeData, isEditing: true } });
  };
  const handleDownloadResume = () => {
    const id = localStorage.getItem('resumeId');
    if (!id) {
      return;
    }
    window.open(`http://localhost:5000/api/StudentData/${id}/download`);
  };

  const handleProfile = () => {
    navigate('/StudentProfileView');
  }
  const handleApplicationStatus = () => {
    navigate('/AllApplicationStatus');
  }

  const handleLogOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userObjectId');
    localStorage.removeItem('resumeId');
    navigate('/StudentLogIn');
  }




  return (
    <Box sx={{ display: "flex" }} className='relative overflow-hidden'>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-black w-full text-white" >
        <Toolbar>
          <Typography className="flex items-center justify-between px-4" variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Company Name with Logo
            <div>
              <Tooltip title="Home">
                <IconButton aria-label="Home" className="text-white">
                  <Link to='/'><BiHomeAlt size={24} className="text-white" /></Link>
                </IconButton>
              </Tooltip>
            </div>
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <Tooltip title="Profile">
              <IconButton aria-label="profile">
                <MenuIcon className="text-white" />
              </IconButton>
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <JobList />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} className='text-white'>
            {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
          <div className=" flex flex-col items-center justify-center -mt-[12vh]">
            <div className="bg-[#000] w-full h-[12vh] flex items-center justify-center text-white">
              <h3 className="font-bold mb-1 ">Student Profile</h3>
            </div>
          </div>
          <div className="flex py-1 bg-black mt-1 flex-col h-[200vh] items-center border-bottom mb-2 justify-center gap-1 w-full">
            {resumeDetails?.imgURL && (
              <img
                src={`http://localhost:5001${resumeDetails.imgURL}`}
                alt="Profile"
                className="w-[120px] h-[120px] bg-cover rounded-full shadow-2xl"
              />
            )}
            <p className="text-md font-semibold capitalize pb-2">{resumeDetails?.fullName}</p>
            <a href={`mailto:${resumeDetails?.email}`} className="text-md font-semibold pb-2 ">{resumeDetails?.email}</a>
            <a href={`tel:+${resumeDetails?.mobile}`} className="text-md font-semibold pb-2 ">{resumeDetails?.phone}</a>
          </div>
        <Divider />
        <div className="flex items-center justify-center flex-col gap-2 mt-3 mb-3">
          <button onClick={handleProfile} className="hover:scale-110 ease-linear duration-300 w-[15rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">
            Profile
          </button>
          <button onClick={handleApplicationStatus} className="hover:scale-110 ease-linear duration-300 w-[15rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">
            All Application Status
          </button>
          <button onClick={handleEditResume} className="hover:scale-110 ease-linear duration-300 w-[15rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">
            Edit your resume
          </button>
          {/* onClick={downloadPDF} */}
          <button onClick={handleDownloadResume} className="hover:scale-110 ease-linear duration-300 w-[15rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Download"> <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#f1f1f1" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" id="Vector"></path> </g> </g></svg>
            Download Resume
          </button>
          <button className="hover:scale-110 ease-linear duration-300 w-[15rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">
            <Link to='/DashBoard' className="hover:text-white ">DashBoard</Link>
          </button>
        </div>
        <Divider />
        <div className="flex flex-col-reverse h-full items-center gap-2 mt-3 mb-3">
          <button onClick={handleLogOut} className="hover:scale-110 ease-linear duration-300 w-[15rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-red-700 bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">Log Out</button>
        </div>
      </Drawer>
    </Box>
  );
}
