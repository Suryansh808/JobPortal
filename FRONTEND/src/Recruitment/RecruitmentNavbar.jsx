import React, { useState } from "react";
// import React from "react";
import { Link } from "react-router-dom";
import ToggleComponent from "../Components/Switch";
const RecruitmentNavbar = () => {
    // State to manage mobile menu visibility
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Function to toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(prevState => !prevState);
    };



    return (
        <>
            <header id="RecruitmentNavbar">
                <div className="web-view" >
                    <div >
                        <Link to='/Recruitment'>
                            <h1><span>D</span>-Solution</h1> </Link>
                    </div>
                    <ul>
                        <li ><Link to='/Recruitment'> HOME</Link></li>
                        <li >CAREER</li>
                        <li >PARTNER</li>
                        <li >COMPANY</li>
                    </ul>
                    <div className="careeroption" onClick={toggleMobileMenu} ><h1>&#9776;</h1></div>

                    <div>
                        {/* <ToggleComponent /> */}
                        <Link to='/'> <ToggleComponent /></Link>

                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="mobile-view">
                        <ul>
                            <li ><Link to='/Recruitment'> HOME</Link></li>
                            <li >CAREER</li>
                            <li >PARTNER</li>
                            <li >COMPANY</li>
                        </ul>
                    </div>
                )}
            </header>
        </>
    );
};
export default RecruitmentNavbar;
