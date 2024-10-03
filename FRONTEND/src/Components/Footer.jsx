import React from 'react';
import { useLocation, useNavigate , Link } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {

  const currentYear=new Date().getFullYear();

  const navigate = useNavigate();
  const handleNavigation = (section) => {
    navigate(`/what-we-do#${section}`);
  };
   
  const handleWhoWeAre = (section) => {
    navigate(`/Who-We-Are#${section}`);
  }
  const location = useLocation();
  const noHeaderFooterRoutes = ['/CompanyDashBoard', '/CompanyLogInPage', '/Cv/:resumeId', "/ViewResume",'/ResumeView' ,'/CompanySignUpPage' , '/StudentLogIn','/AllApplicationStatus' , '/StudentSignUp', '/StudentProfileView' , '/AdminLogInPage' ,'/HrLogin' ,'/HRHome','/Recruitment','/AdminDashboard','/HrPDashboard'];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);
   
  return (
   <>
    {
      showHeaderFooter &&  <MDBFooter bgColor='black' className='text-center  text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
              <Link to='/HrLogin'>HR Pnael</Link>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4 flex flex-col items-center justify-center gap-1'>
              <h6 className='text-uppercase fw-bold mb-2'>Suggestion</h6>
          
               <button onClick={() => handleNavigation('overviewRef')} className='text-reset'>
                Overview
               </button>
            
          
              <button onClick={() => handleNavigation('industriesRef')} className='text-reset'>Industries</button>
            
          
                <button onClick={() => handleNavigation('servicesRef')} className='text-reset'>
                  Services
                </button>
            
          
                <button onClick={() => handleNavigation('productsRef')} className='text-reset'>
                  Product and Platform
                </button>
            
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4 flex flex-col items-center justify-center gap-1'>
              <h6 className='text-uppercase fw-bold mb-2'>About us </h6>
        
                <button onClick={() => handleWhoWeAre('OurMission')} className='text-reset'>
                  Our mission 
                </button>
          
        
                <button onClick={() => handleWhoWeAre('OurVision')} className='text-reset'>
                Our vision 
                </button>
          
        
                <button onClick={() => handleWhoWeAre('OurProject')} className='text-reset'>
                 Our projects
                </button>
          
        
                <button onClick={() => handleWhoWeAre('CoreValues')} className='text-reset'>
                  Core values
                </button>
          
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Company address
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="mailto:">info@example.com</a> 
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 
                <a href="tel:+">number</a> 
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
       {currentYear} &copy; all rights reseverved 
        <a className='text-reset fw-bold' href="/"> Company name         
        </a>
      </div>
    </MDBFooter>
      
    }
   </>
  );
}