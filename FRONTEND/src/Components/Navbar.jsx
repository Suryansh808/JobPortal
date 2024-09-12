import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom'
// import { dividerClasses } from '@mui/material';

const pages = [
    { name: 'Home', path: '/' },
    { name: 'What we do', path: '/what-we-do' },
    { name: 'Who we are', path: '/who-we-are' },
    { name: 'Insights', path: '/insights' },
    { name: 'Career', path: '/career' },
    {name : 'Newsroom', path : '/newsroom'},
    { name: 'Contact us', path: '/contact-us' },
  ];

// const settings = ['Profile', 'Account', '/Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const headerRef = useRef(null);

    useEffect(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 }, // Start from bottom and transparent
        { y: 0, opacity: 1, duration: 1  } // Move to top and fully visible
      );
    }, []);

    const menuItemsRef = useRef([]);

    useEffect(() => {
      if (anchorElNav) {
        gsap.fromTo(
          menuItemsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }
        );
      }
    }, [anchorElNav]);

  const location = useLocation();
  const noHeaderFooterRoutes = ['/CompanyDashBoard', '/CompanyLogInPage' , '/AdminLogInPage' ,'/CompanySignUpPage', '/StudentLogIn','/AllApplicationStatus', '/StudentSignUp', '/StudentProfileView' , '/HrLogin' ,'/HRHome','/AdminDashboard','/Recruitment','/HrPDashboard'];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);
  const navigate = useNavigate();

  const handleToggle = () => {
    navigate("/career");
  };
  return (
    <>
    {
      showHeaderFooter && <AppBar position='sticky'>
      <Container maxWidth="" className="bg-black w-full text-white ">
        <Toolbar ref={headerRef} disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             <Link to="/" className='hover:scale-110 ease-linear duration-300 hover:text-white px-3 '> LOGO</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon  />
            </IconButton>
            <Menu
      id="menu-appbar"
      anchorEl={anchorElNav}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(anchorElNav)}
      onClose={handleCloseNavMenu}
      sx={{
        display: { xs: 'block', md: 'none', },
      }}
    >
      {pages.map((page, index) => (
        <MenuItem
          key={page.name}
          onClick={handleCloseNavMenu}
          ref={(el) => (menuItemsRef.current[index] = el)}
        >
          <Typography textAlign="center" >
            <Link
              to={page.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {page.name}
            </Link>
          </Typography>
        </MenuItem>
      ))}
    </Menu>
 
          </Box>
          
          <Typography
           className='w-full flex items-center justify-center px-4'
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',  
            }}
           
          >
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
           <Link to="/"> LOGO</Link>
          </Typography>
          {/* <Box className='flex items-center gap-2 w-full px-10' >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className='hover:scale-110 ease-linear duration-300 ' 
              >
                <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                {page.name}
                 </Link>
              </Button>
            ))}
          </Box> */}
         <Box className='flex items-center justify-between w-full px-10'>
      <div className='hidden md:flex items-center gap-2'>
        {pages.slice(0, -1).map((page) => (
          <Button
            key={page.name}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block' }}
            className='hover:scale-110 ease-linear duration-300' 
          >
            <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              {page.name}
            </Link>
          </Button>
        ))}
      </div>
      <div>
      
       <label className="relative inline-flex items-center cursor-pointer">
  <input className="sr-only peer" value="" type="checkbox"  onChange={handleToggle}/>
  <div className="group peer ring-2  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600  rounded-full outline-none duration-1000 after:duration-300 w-24 h-12  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39]   peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-10 after:w-10 after:top-1 after:left-1   peer-checked:after:translate-x-12 peer-hover:after:scale-125">
  </div>
</label>
     
      </div>
      <div className='hidden md:flex items-center'>
        <Button
          key={pages[pages.length - 1].name}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
          className='hover:scale-110 ease-linear duration-300' 
        >
          <Link to={pages[pages.length - 1].path} style={{ textDecoration: 'none', color: 'inherit' }}>
            {pages[pages.length - 1].name}
          </Link>
        </Button>
      </div>
    </Box> 
        </Toolbar>
      </Container>
    </AppBar>
    }
    </>
  );
}
export default ResponsiveAppBar;
