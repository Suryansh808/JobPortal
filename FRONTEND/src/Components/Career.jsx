import React from "react";
import { Link } from "react-router-dom";
import video from "../assets/bgvideo.mp4";
import image from "../assets/designing.webp";
import { BsArrowRightCircle } from "react-icons/bs";
import TabPart from "../Components/TabPart";

const Career = () => {
  return (
    <>
      <section className="top-video-part">
        <div className="container-video w-full h-full relative">
          <video src={video} muted autoPlay loop></video>
          <div className="w-full h-full absolute top-0 bg-gradient-to-l from-[#00000063] to-[#141414cf]">
            <div className="w-full flex flex-col px-[15vw] mt-[10vh] max-[600px]:mt-0   text-white ">
              <h1 className="text-[2.5rem] max-[600px]:text-[1.5rem] font-medium">
                Career
              </h1>
              <hr className="w-[70vw]" />
              <h2 className="pt-5 text-[2rem] max-[600px]:text-[1.5rem] max-[600px]:tracking-tight max-[600px]:leading-tight">
                Empower your passion, Elevate your career.
              </h2>
              <div className="mt-3">
                {/* <button class="flex items-center bg-black text-white gap-1 px-4 py-2 mb-3 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3">
                <Link to='/StudentSignUp' className="hover:text-white">Apply for jobs</Link>
                  <svg
                    class="w-5 h-5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>
                <button class="flex items-center bg-black text-white gap-1 px-4 py-2 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3">
                <Link to='/CompanyLogInPage' className="hover:text-white">Hiring Partner</Link>
                  <svg
                    class="w-5 h-5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button> */}
                <div className="">
      <div className="container bg-[#ffffff27] backdrop-blur-sm w-full flex  rounded-lg">
        {/* Section for Students */}
        <div className="py-3 px-2">
          <h2 className="text-3xl font-bold text-[#252A1D] mb-4 whitespace-nowrap">
            Are you a Student Looking for a Job?
          </h2>
          <p className="text-white mb-6">
            Kickstart your career by applying for the latest job opportunities tailored for students. Explore roles that match your skills and start your journey towards a successful career.
          </p>
          <div className="flex justify-center">
          <button class="flex items-center bg-black text-white gap-1 px-4 py-2 mb-3 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3">
                <Link to='/StudentSignUp' className="hover:text-white">Apply for jobs</Link>
                  <svg
                    class="w-5 h-5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>
          </div>
        </div>

        {/* Section for Companies */}
        <div className="py-3 px-2 ">
          <h2 className="text-3xl font-bold text-[#252A1D] mb-4 whitespace-nowrap">
            Are you a Company Looking to Hire Talent?
          </h2>
          <p className="twhite-600 mb-8">
            Join our network of hiring partners and gain access to a pool of talented students eager to start their careers. Find the perfect candidates for your company's needs.
          </p>
          <div className="flex justify-center ">
          <button class="flex items-center bg-black text-white gap-1 px-4 py-2 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3">
                <Link to='/CompanyLogInPage' className="hover:text-white">Hiring Partner</Link>
                  <svg
                    class="w-5 h-5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </button>
          </div>
        </div>
      </div>
    </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="join-us border-b">
        <div className="container py-4 flex gap-2 items-center w-full max-[600px]:flex-wrap">
          <div className="content-join-us w-1/2 max-[600px]:w-full px-2 py-2 flex flex-col items-center gap-5">
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-[1.5rem] font-medium max-[600px]:text-center">
                Join Us
              </h1>
              <h2 className="text-[1.4rem] max-[600px]:text-center">
                Shape the future of technology
              </h2>
              <p className="text-[1rem] max-[600px]:text-center tracking-tight">
                As a global company with unparalleled scale, a track record of
                pioneering innovation, and a huge and influential client base,
                we offer associates a chance to drive change and improve the
                lives of millions of people around the world.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-[1.5rem] font-medium max-[600px]:text-center">
                Join Us
              </h1>
              <h2 className="text-[1.4rem] max-[600px]:text-center">
                Shape the future of technology
              </h2>
              <p className="text-[1rem] max-[600px]:text-center tracking-tight">
                As a global company with unparalleled scale, a track record of
                pioneering innovation, and a huge and influential client base,
                we offer associates a chance to drive change and improve the
                lives of millions of people around the world.
              </p>
            </div>
          </div>
          <div className="container-image w-1/2 max-[600px]:w-full">
            <div className="image w-full h-full overflow-hidden p-2">
              <img
                className="hover:scale-110 ease-linear duration-500"
                src={image}
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="tab-part py-2 border-b">
        <TabPart />
      </section>
      <section className='w-full h-[100vh] relative bg-cover bg-center bg-[url("https://s7ap1.scene7.com/is/image/TCSCOMprod/leadership-banner?wid=1400&hei=788&dpr=off")]'>
        <div className="w-full h-full absolute top-0 bg-gradient-to-l from-[#00000049] to-[#141414a2]">
          <div className="w-full h-full mt-10 flex flex-col items-center">
            <h1 className="text-[1.4rem] text-white uppercase">About Us</h1>
            <h2 className="text-[1rem] pt-2 text-center text-white">
              We are a global technology company that designs, develops, and
              sells hardware and software products for the creation,
              distribution, and enjoyment of digital media.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default Career;
