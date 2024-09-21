import React from "react";
import { Link } from "react-router-dom";
import ToggleComponent from "../Components/Switch";
const RecruitmentNavbar = () => {
    return (
        <>
            <header id="RecruitmentNavbar">
                <div className="web-view" >
                    <div >
                        <Link to='/Recruitment'>
                            <h1><span>D</span>-Solution</h1> </Link>
                    </div>
                    <ul className="">
                        <li ><Link to='/Recruitment'> HOME</Link></li>
                        <li >CAREER</li>
                        <li >PARTNER</li>
                        <li >COMPANY</li>
                    </ul>
                    <div>
                        <ToggleComponent />
                    </div>
                </div>
                <div className="mobile-view" style={{display:'none'}}>
                    <ul>
                    <li ><Link to='/Recruitment'> HOME</Link></li>
                        <li >CAREER</li>
                        <li >PARTNER</li>
                        <li >COMPANY</li>
                    </ul>
                </div>
            </header>
        </>
    );
};
export default RecruitmentNavbar;
