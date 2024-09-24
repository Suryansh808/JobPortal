import React, { useState, useEffect} from 'react';
import { Routes, Route} from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import WhatWeDo from "./Components/WhatWeDo";
import WhoWeAre from "./Components/WhoWeAre";
import Insights from "./Components/Insights";
import Career from "./Components/Career";
import ContactUs from "./Components/ContactUs";
import ReadMore from "./Components/ReadMore";
import FooterWithSocialLinks from "./Components/Footer";
import DashBoard from "./layouts/DashBoard";
import Profile from "./layouts/Profile";
import Newsroom from "./Components/Newsroom";
import Resume from "./Components/Resume";
import Loader from './Components/Loader';
import SmoothScroll from './SmoothScroll';
import StudentLogIn from './pages/StudentLogIn';
import StudentSignUp from './pages/StudentSignUp';
import ScrollToTop from './ScrollToTop';
import CustomizedDialogs from './layouts/CustomizedDialogs';
import NotFound from './Components/NotFound';
import PaymentComponent from './layouts/PaymentComponent';
import PaymentPage from './layouts/PaymentPage';
import PaymentSuccess from './layouts/PaymentSuccess';
import CompanySignUpPage from './CompanyPanel/CompanySignUpPage';
import CompanyLogInPage from './CompanyPanel/CompanyLogInPage';
import CompanyDashboard from './CompanyPanel/CompanyDashBoard';
import CompanyProfile from './CompanyPanel/CompanyProfile';
import { CompanyProvider } from './CompanyPanel/CompanyContext';
import ForgotPassword from './CompanyPanel/ForgotPassword';
import { AuthProvider } from './CompanyPanel/AuthContext';
import ProtectedRoute from './CompanyPanel/ProtectedRoute';
import StudentProfileView from './pages/StudentProfileView';
import Recruitment from './Recruitment/Recruitment';
import AdminDashboard from './Owner/OwnerDashboard';
import HrPDashboard from './HrDashboard/HrDashboard';
import HrLogin from './HrDashboard/HrLogin';
import AdminLogInPage from './Owner/AdminLogInPage';
import AllApplicationStatus from './pages/AllApplicationStatus';
import ResumePreview from './Components/ResumePreview';
import ResumeView from './HrDashboard/ResumeView';
import TitleUpdater from '../TitleUpdater';
import ViewResume from './CompanyPanel/ViewResume';
import List from './CompanyPanel/List';
import NewNavbar from './Components/Newnavbar';
import Cv from './CompanyPanel/Cv';


import WhatwedoOverview from './NavPages/what-we-do-overview';
import WhatwedoIndustries from './NavPages/what-we-do-industries';
import WhatwedoService from './NavPages/what-we-do-services';
import WhatwedoProduct from './NavPages/what-we-do-product';

import WhoweareMission from './NavPages/who-we-are-Mission';
import WhoweareVission from './NavPages/who-we-are-vission';
import WhoweareProject from './NavPages/who-we-are-project';
import WhoweareAbout from './NavPages/who-we-are-aboutus';

import Insight1 from './NavPages/insight1';
import Insight2 from './NavPages/insight2';
import Insight3 from './NavPages/insight3';
import Insight4 from './NavPages/insight4';



const App = () => {
 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request or other async operation
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this timeout as needed
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <SmoothScroll/>
       <HashRouter>
        <TitleUpdater/>
      <ScrollToTop/>
      <NewNavbar/>
        {/* <Navbar/> */}
        <CompanyProvider>
        <AuthProvider>
        <Routes>
          <Route index path="/" element={<Home/>} />
          <Route index path="/what-we-do" element={<WhatWeDo/>} />
          <Route index path="/who-we-are" element={<WhoWeAre/>} />
          <Route index path="/insights" element={<Insights/>} />
          <Route index path="/newsroom" element={<Newsroom/>} />
          <Route index path="/career" element={<Career/>} />
          <Route index path="/contact-us" element={<ContactUs/>} />
          <Route index path="/read-more" element={<ReadMore/>} />
          <Route index path ="/Resume" element={<Resume/>}/>
          <Route index path="/DashBoard" element={<DashBoard />}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/ResumePreview" element={<ResumePreview/>}/>
          <Route path="/StudentSignUp" element={<StudentSignUp/>} />
          <Route path="/StudentLogIn" element={<StudentLogIn/>} />
          <Route path="/StudentProfileView" element={<StudentProfileView/>} />
          <Route path="/AllApplicationStatus" element={<AllApplicationStatus/>} />
          <Route path="/CustomizedDialogs" element={<CustomizedDialogs/>} />
          <Route path="/PaymentComponent" element={<PaymentComponent/>} />
          <Route path="/PaymentPage" element={<PaymentPage/>} />
          <Route path="/PaymentSuccess" element={<PaymentSuccess/>} />
          <Route path="/CompanyLogInPage" element={<CompanyLogInPage/>} />
          <Route element={<ProtectedRoute/>}></Route>
          <Route path="/CompanyDashBoard" element={<CompanyDashboard/>}/>
          <Route path="/company/:companyId" element={<CompanyProfile />} />
          <Route path="/CompanySignUpPage" element={<CompanySignUpPage/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />
          <Route path="/ViewResume" element={<ViewResume/>}/>
          <Route path="/Cv/:resumeId" element={<Cv/>}/>
          <Route path="/List" element={<List/>}/>

          <Route path="*" element={<NotFound/>}/>s

          <Route path="/Recruitment" element={<Recruitment/>}/>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
          <Route path="/AdminLogInPage" element={<AdminLogInPage/>}/>


          <Route path="/HrLogin" element={<HrLogin/>} />
          <Route path="/HrPDashboard" element={<HrPDashboard/>}/>
          <Route path="/ResumeView" element={<ResumeView/>}/>



          <Route path="/Overview" element={<WhatwedoOverview/>}/>
          <Route path="/Industries" element={<WhatwedoIndustries/>}/>
          <Route path="/Services" element={<WhatwedoService/>}/>
          <Route path="/Product" element={<WhatwedoProduct/>}/>

          <Route path="/Mission" element={<WhoweareMission/>}/>
          <Route path="/Vission" element={<WhoweareVission/>}/>
          <Route path="/Project" element={<WhoweareProject/>}/>
          <Route path="/About" element={<WhoweareAbout/>}/>

          <Route path="/Insight1" element={<Insight1/>}/>
          <Route path="/Insight2" element={<Insight2/>}/>
          <Route path="/Insight3" element={<Insight3/>}/>
          <Route path="/Insight4" element={<Insight4/>}/>



        </Routes> 
        </AuthProvider>
        </CompanyProvider>
        <FooterWithSocialLinks />
      </HashRouter>
    </div>
  )
}

export default App;



