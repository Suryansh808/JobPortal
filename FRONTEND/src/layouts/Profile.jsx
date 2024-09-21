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
import { BiHomeAlt } from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import JobList from "../pages/JobList";
import axios from 'axios';


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
        const response = await fetch(`http://localhost:5000/api/StudentData/${id}`);
        const data = await response.json();
        setResumeDetails(data.StudentData);
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };

    fetchResume();
  }, []);

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

  const navigate = useNavigate();

  const handleEditResume = async () => {
    const resumeId = localStorage.getItem('resumeId');
  
    if (!resumeId) {
      console.error('No resume ID found in local storage');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/StudentData/${resumeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume data');
      }
  
      const data = await response.json();
      // Assuming 'StudentData' is the field containing the resume details
      const resumeData = data.StudentData || {};
  
      navigate('/Resume', {
        state: { resumeData, isEditing: true }
      });
    } catch (error) {
      console.error('Error fetching resume data:', error);
    }
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

  const handlePreviewResume = () => {
    if (!resumeDetails) {
      alert('Resume details not available');
      return;
    } 
    navigate('/ResumePreview', { state: { resumeDetails } });
  };


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
          <div className="flex py-1 mt-1 flex-col h-[200vh] items-center border-bottom mb-2 justify-center gap-1 w-full">
      {userData?.imageUrl && (
        <img
          src={userData.imageUrl}
          alt="Profile"
          className="w-[120px] h-[120px] bg-cover rounded-full shadow-2xl"
        />
      )}
      <p className="text-md font-semibold capitalize pb-2">{userData?.fullname}</p>
      <a href={`mailto:${userData?.email}`} className="text-md font-semibold pb-2 ">{userData?.email}</a>
      <a href={`tel:+${userData?.phone}`} className="text-md font-semibold pb-2 ">{userData?.phone}</a>
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
          <button onClick={handlePreviewResume} className="hover:scale-110 ease-linear duration-300 w-[15rem] cursor-pointer flex items-center justify-center gap-1.5 px-4 py-2 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition font-semibold shadow-xl">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24px" width="24px">
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
               <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
                 <g id="SVGRepo_iconCarrier">
                   <g id="Interface / Download">
                  <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2" stroke="#f1f1f1" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" id="Vector"></path>
                   </g>
                </g>
               </svg>
              Preview Resume
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
