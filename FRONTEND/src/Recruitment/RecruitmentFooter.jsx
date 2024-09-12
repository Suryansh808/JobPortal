import React from "react";
import { Link } from "react-router-dom";

const RecruitmentFooter = () => {
  return (
    <>
    <footer class="careerfooter">
        <div class="container">
            <div>
                <ul>
                    <li><a href="">ABOUT US</a></li> <br />
                    <li><a href="">Term & Conditions</a></li> 
                </ul>
            </div>
            <div>
                <a href="">Copyright © 2024 K-Solution</a>
            </div> 
            
            <div>
                <ul class="social-links">
                    <li><a href="">CONTACT US</a></li> <br />
                    <li><a href="https://www.linkedin.com/company/krutanic/" target="blank"><i class="fab fa-linkedin-in "></i></a></li>
                    <li><a href="" target="blank"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i class="fab fa-youtube"></i></a></li>
                    <li><a href="https://www.instagram.com/krutanic/" target="blank"><i class="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                </ul>

            </div>            
            
        </div>
    </footer>

    </>
  );
};

export default RecruitmentFooter;
