import React from "react";
import { Link } from "react-router-dom";
// import comp1 from "../assets/company1.png"
// import comp2 from "../assets/company2.png"
import RecruitmentFooter from "./RecruitmentFooter";

const Recruitment = () => {
  return (
    <>
    <div className="careerportal">
      <header> 
      
        <img src="" alt="K-Solution"/>
        <nav>
          <ul>
            <li><a href="">HOME</a></li>
            <li><Link to='/StudentLogIn'>CAREER</Link></li>
            <li><a href="https://krutanic.com/" target="_blank">PARTNER</a></li>
            <li><Link to='/CompanyLogInPage'>COMPANY</Link></li>
            
            {/* <li><a href="#" class="btn-log">Login</a></li>
            <li><a href="#" class="btn-reg">Register</a></li> */}
          </ul>
        </nav>
      </header>
      <section className="hero">
        <div class="user">
          <div>
            <h2>Are you a Looking for a job?</h2>
            <p>Kickstart your career by applying for the latest job opportunities tailored for students. Explore roles that match your skills and start your journey towards a successful career</p>
            <button><Link to='/StudentLogIn'>Apply</Link></button>
          </div>
        </div>
        <div className="hiring-partner">
          <h2>COMPANY</h2>
          <div>
            {/* <img src={comp1} alt=""/>
            <img src={comp2} alt=""/>
            <img src={comp1} alt=""/>
            <img src={comp2} alt=""/>
            <img src={comp1} alt=""/> */}
          </div>
        </div>
        <div class="hiring"  >
                <div>
                    <h2>Are you a Looking for hire Talent?</h2>
                    <p>Join our network of hiring partner and gain access to a pool of talented students eager to start their careers. Find the perfect candidates for your company's needs</p>
                    <button><Link to='/CompanyLogInPage' >Hiring</Link></button>
                </div>
            </div>
            <div class="hiring-partner">
                <h2>HIRING PARTNERS</h2>
                <div>
                {/* <img src={comp1} alt=""/>
                <img src={comp2} alt=""/>
                <img src={comp1} alt=""/>
                <img src={comp2} alt=""/>
                <img src={comp1} alt=""/> */}
                </div>
            </div>
      </section>
    </div>
    <RecruitmentFooter/>
    

    </>
  );
};

export default Recruitment;
