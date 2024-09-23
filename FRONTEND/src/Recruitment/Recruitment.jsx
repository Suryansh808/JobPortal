import React, { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import ToggleComponent from "../Components/Switch";
import comp1 from "../assets/1.webp"
import comp2 from "../assets/2.png"
import comp3 from "../assets/3.png"
import comp4 from "../assets/4.png"
import RecruitmentFooter from "./RecruitmentFooter";
import RecruitmentNavbar from "./RecruitmentNavbar";


const Recruitment = () => {
  
  return (
    <>
      <div className="careerportal">
        <RecruitmentNavbar />
        <section className="hero">
          <div class="user">
            <div>
              <h2>Are you a Looking for a job?</h2>
              <p>Kickstart your career by applying for the latest job opportunities tailored for students. Explore roles that match your skills and start your journey towards a successful career</p>
              <button><Link to='/StudentLogIn'>Apply</Link></button>
            </div>
          </div>
          <div style={{backgroundImage:'conic-gradient(black 0deg, black 90deg, #fefdfe 90deg, #fefdfe 180deg, #fefdfe 180deg, #fefdfe 270deg, #9bd7e0 270deg)'}}>
          <div className="hiring-partner">

            <h2>COMPANY</h2>
            <div >
           
               <img  src={comp2} alt="" />
               <img src={comp3} alt="" />
               <img src={comp4} alt="" />
              <img src={comp1} alt="" />
               <img src={comp2} alt="" />
               <img src={comp3} alt="" />
               <img src={comp4} alt="" />
               <img src={comp1} alt="" />
               <img src={comp2} alt="" />
               <img src={comp3} alt="" />
              <img src={comp4} alt="" />
               <img src={comp1} alt="" />
              <img src={comp2} alt="" />
              <img src={comp3} alt="" />
               <img src={comp4} alt="" />
            
            </div>
          </div>
          </div>
          <div class="hiring"  >
            <div>
              <h2>Are you a Looking for hire Talent?</h2>
              <p>Join our network of hiring partner and gain access to a pool of talented students eager to start their careers. Find the perfect candidates for your company's needs</p>
              <button><Link to='/CompanyLogInPage' >Hiring</Link></button>
            </div>
          </div>
          <div style={{backgroundColor:'white'}}>
          <div class="hiring-partner" 
           style={{borderBottomRightRadius:'0px',borderBottomLeftRadius:'0px'}}>
            <h2>HIRING PARTNERS</h2>
            <div >
              <img src={comp1} alt="" />
              <img src={comp2} alt="" />
              <img src={comp3} alt="" />
              <img src={comp4} alt="" />
              <img src={comp1} alt="" />
              <img src={comp2} alt="" />
              <img src={comp3} alt="" />
              <img src={comp4} alt="" />
              <img src={comp1} alt="" />
              <img src={comp2} alt="" />
              <img src={comp3} alt="" />
              <img src={comp4} alt="" />

            </div>
          </div>
          </div>
        </section>
      </div>
      <RecruitmentFooter />
    </>
  );
};

export default Recruitment;
