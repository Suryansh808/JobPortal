import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ToggleComponent from './Switch';
import { useLocation } from 'react-router-dom';

const NewNavbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeOption, setActiveOption] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [activeMobileMenuOption, setActiveMobileMenuOption] = useState(null);

    const toggleDropdown = (dropdownId) => {
        // Set the dropdown as active and default to the first option
        if (activeDropdown === dropdownId) {
            setActiveDropdown(null);
            setActiveOption(null); // Close dropdown
        } else {
            setActiveDropdown(dropdownId);
            setActiveOption('Option1'); // Default to first option
        }
    };

    const selectOption = (option) => {
        setActiveOption(option);

    };
    const toggleMobileMenu = () => {
        setShowMobileMenu(prev => !prev);
    };

    const toggleMobileMenuOption = (optionId) => {
        setActiveMobileMenuOption(prev => (prev === optionId ? null : optionId));
    };
    const location = useLocation();
    const noHeaderFooterRoutes = ['/CompanyDashBoard', '/CompanyLogInPage', '/AdminLogInPage', '/CompanySignUpPage', '/StudentLogIn', '/StudentSignUp', '/StudentProfileView', '/HrLogin', '/HRHome', '/AdminDashboard', '/HrPDashboard','/Recruitment'];
    const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

    return (
        <>
            {
                showHeaderFooter &&
                <div id="header" >
                    <div className="navbar" >
                        <div onClick={() => toggleDropdown()}>
                        <Link to='/'> 
                            <h1><span>D</span>-Solution</h1> </Link>
                        </div>

                        <ul>
                            <li onClick={() => toggleDropdown()}><Link to='/'> HOME</Link></li>
                            <li onClick={() => toggleDropdown('what_we_do')}>WHAT WE DO</li>
                            <li onClick={() => toggleDropdown('who_we_are')}>WHO WE ARE</li>
                            <li onClick={() => toggleDropdown('insight')}>INSIGHT</li>
                            <li onClick={() => toggleDropdown()}>CONTACT US</li>
                        </ul>
                        <label class="hamburger" >
                            <input type="checkbox" />
                            <svg viewBox="0 0 32 32" onClick={toggleMobileMenu}>
                                <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path class="line" d="M7 16 27 16"></path>
                            </svg>
                        </label>
                        <div onClick={() =>{toggleDropdown();}}>
                        <ToggleComponent />
                        </div>
                        
                    </div>
                    {showMobileMenu && (
                        <div className="mobile-menu">
                            <ul>
                                <li onClick={() => toggleMobileMenuOption()}>
                                    HOME
                                </li>
                                <li onClick={() => toggleMobileMenuOption('option2')}>
                                    WHAT WE DO
                                    {activeMobileMenuOption === 'option2' && (
                                        <ul>
                                            <li><span>&#11162;</span> OVERVIEW</li>
                                            <li><span>&#11162;</span>INDUSTRIES</li>
                                            <li><span>&#11162;</span>SERVICES</li>
                                            <li><span>&#11162;</span>PRODUCT AND PLATFORM</li>
                                        </ul>
                                    )}
                                </li>
                                <li onClick={() => toggleMobileMenuOption('option3')}>
                                    WHO WE ARE
                                    {activeMobileMenuOption === 'option3' && (
                                        <ul>
                                            <li><span>&#11162;</span>OUR MISSION</li>
                                            <li><span>&#11162;</span>OUR VISSION</li>
                                            <li><span>&#11162;</span>OUR PROJECT</li>
                                            <li><span>&#11162;</span>ABOUT US</li>
                                        </ul>
                                    )}
                                </li>
                                <li onClick={() => toggleMobileMenuOption('option4')}>
                                    INSIGHT
                                    {activeMobileMenuOption === 'option4' && (
                                        <ul>
                                            <li><span>&#11162;</span>OPTION 1</li>
                                            <li><span>&#11162;</span>OPTION 1</li>
                                            <li><span>&#11162;</span>OPTION 1</li>
                                            <li><span>&#11162;</span>OPTION 1</li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        </div>
                    )}

                    {activeDropdown === 'what_we_do' && (
                        <div id="what_we_do" className="dropdown" onClick={() => toggleDropdown()} >
                            <div className="option">
                                <div className="dropdown_option">
                                    <ul >
                                        <li onMouseOver={() => selectOption('Option1')}> <Link to='/what-we-do'> Overview <span>&#11162;</span></Link> </li>
                                        <li onMouseOver={() => selectOption('Option2')}> <Link to='/what-we-do'>Industries <span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option3')}> <Link to='/what-we-do'>Services <span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option4')}> <Link to='/what-we-do'>Product and Platform <span>&#11162;</span></Link></li>
                                    </ul>
                                </div>
                                {activeOption === 'Option1' && (
                                    <div className="option_content">
                                        <h1>Overview</h1>
                                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime doloremque ipsa aperiam iure necessitatibus magni temporibus dolorum, qui dolores? Nisi neque numquam totam cum repellendus, dolores labore optio amet recusandae!</h2>
                                    </div>
                                )}
                                {activeOption === 'Option2' && (
                                    <div className="option_content">
                                        <h1>Industries</h1>
                                        <ol>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                        </ol>
                                    </div>
                                )}
                                {activeOption === 'Option3' && (
                                    <div className="option_content">
                                        <h1>Services</h1>
                                        <ol>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                        </ol>
                                    </div>
                                )}
                                {activeOption === 'Option4' && (
                                    <div className="option_content">
                                        <h1>Product and Platform</h1>
                                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laudantium, cumque iste praesentium a laborum voluptatibus sint quaerat facilis molestias dolore facere aliquam fugiat consectetur, eius dolorum voluptates est ipsum. Voluptatem sit odio aspernatur aliquid soluta ad deserunt itaque accusantium ut, mollitia placeat deleniti nostrum quidem, doloribus error dicta iusto?</h2>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeDropdown === 'who_we_are' && (
                        <div id="who_we_are" className="dropdown" onClick={() => toggleDropdown()}>
                            <div className="option">
                                <div className="dropdown_option">
                                    <ul>
                                        <li onMouseOver={() => selectOption('Option1')}><Link to='/who-we-are'>Our Mission <span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option2')}><Link to='/who-we-are'>Our Vission<span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option3')}><Link to='/who-we-are'>Our Project<span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option4')}><Link to='/who-we-are'>About Us<span>&#11162;</span></Link></li>
                                    </ul>
                                </div>
                                {activeOption === 'Option1' && (
                                    <div className="option_content">
                                        <h1>Our Mission</h1>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. In cupiditate commodi qui soluta repudiandae quam iusto facilis natus ab magnam, repellendus adipisci? Optio ab natus enim nisi explicabo ipsam similique reiciendis animi quibusdam eos vel iure neque tempore quis, iusto amet, mollitia nemo. Architecto reiciendis libero hic cumque error sapiente.</h3>
                                    </div>
                                )}
                                {activeOption === 'Option2' && (
                                    <div className="option_content">
                                        <h1>Our Vission</h1>
                                        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa fugit placeat assumenda necessitatibus unde delectus sint doloribus natus consectetur veniam obcaecati ipsum eaque ipsa, voluptatem est reprehenderit saepe veritatis ea et similique dolorum neque. Architecto numquam delectus quis quod sequi accusantium deserunt dolor maiores modi rerum aut quasi possimus qui ad doloribus necessitatibus debitis, illo expedita quas? Eius, iste cumque!</h3>
                                    </div>
                                )}
                                {activeOption === 'Option3' && (
                                    <div className="option_content">
                                        <h1>Our Project</h1>
                                        <ol>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                            <li>Lorem ipsum dolor sit amet.</li>
                                        </ol>
                                    </div>
                                )}
                                {activeOption === 'Option4' && (
                                    <div className="option_content">
                                        <h1>About Us</h1>
                                        <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis explicabo. Iure reprehenderit tempore, eum sint incidunt consectetur eveniet non quam eius dignissimos voluptate, esse, eos eligendi culpa vitae aspernatur facilis veniam quaerat numquam perspiciatis nobis voluptas. Eos dolorum fugiat distinctio. Sint ullam, dolores ratione temporibus est minus et labore doloribus necessitatibus modi quia minima quos ab eum consequatur debitis error laborum veritatis, quaerat quibusdam magni aliquam repudiandae? Consequatur, minus unde! Repellendus recusandae, maxime pariatur blanditiis inventore doloremque culpa autem ab eum sunt explicabo officia nobis necessitatibus quidem nesciunt ipsa, tenetur suscipit tempore quibusdam ullam neque dolorem. Omnis, vero numquam?</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeDropdown === 'insight' && (
                        <div id="insight" className="dropdown" onClick={() => toggleDropdown()}>
                            <div className="option">
                                <div className="dropdown_option">
                                    <ul>
                                        <li onMouseOver={() => selectOption('Option1')}><Link to='/insights'>Insight First <span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option2')}><Link to='/insights'>Insight Secind<span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option3')}><Link to='/insights'>Insight 3<span>&#11162;</span></Link></li>
                                        <li onMouseOver={() => selectOption('Option4')}><Link to='/insights'>Insight 4<span>&#11162;</span></Link></li>
                                    </ul>
                                </div>
                                {activeOption === 'Option1' && (
                                    <div className="option_content">
                                        <h1>INSIGHT</h1>
                                        <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est harum non voluptates enim possimus veniam vero sapiente, cupiditate cumque? Unde officiis, aliquam explicabo adipisci vel voluptas. Officia quia necessitatibus itaque?</h3>
                                    </div>
                                )}
                                {activeOption === 'Option2' && (
                                    <div className="option_content">
                                        <h1>INSIGHT</h1>
                                        <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque ea quasi nostrum placeat soluta itaque, labore nihil quaerat ab commodi? Quas libero placeat delectus consequatur corporis rem ad consequuntur harum.</h3>
                                    </div>
                                )}
                                {activeOption === 'Option3' && (
                                    <div className="option_content">
                                        <h1>INSIGHT</h1>
                                        <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum harum, cum nulla quos quia ipsa voluptatum, libero cupiditate asperiores corrupti possimus. Illum eum harum iste nemo sed laborum explicabo repellat commodi modi. Consequatur dolore repudiandae amet perspiciatis ratione autem! Facere adipisci distinctio mollitia ex velit sapiente voluptatem omnis libero fuga.</h3>
                                    </div>
                                )}
                                {activeOption === 'Option4' && (
                                    <div className="option_content">
                                        <h1>INSIGHT</h1>
                                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel soluta, pariatur ab voluptatibus possimus voluptates quasi, libero, dolorum veniam corporis odio nesciunt quia ipsam. Dolorum impedit beatae commodi sint quidem, officia deserunt! Quod mollitia placeat rerum error repellendus molestiae sequi, dolores, voluptatem sit praesentium iusto voluptas at adipisci, est architecto nesciunt quos consectetur omnis dolor! Neque repellat fugiat quo ipsum!</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            }
        </>

    )

};

export default NewNavbar;
