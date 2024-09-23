import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPrint } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

const ResumeView = () => {
  const location = useLocation();
  const { resumeId } = location.state || {};

  console.log("get the id ", resumeId);

  const [resume, setResume] = useState(null); // State to store resume data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId) {
        setError("Resume ID is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/resumes/${resumeId}`
        );
        if (!response.ok) {
          throw new Error("Resume not found");
        }
        const data = await response.json();
        console.log("resume data ", data);
        setResume(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handlePrint = () => {
    window.print();
  };
 
  return (
    <div className="relative ">
      <div className="fixed w-[50px] right-5 top-20">
      <div className="relative w-full h-auto">
        <button
          type="button"
          className="absolute bottom-0 rounded-full w-[40px] h-[40px] m-[4px_auto] bg-blue-500 text-white flex items-center justify-center shadow-lg"
          title="Back"
        >
          {/* <FaPrint className="text-xl" /> */}
         <Link to='/HrPDashboard'><MdOutlineClose /></Link>
        </button>
      </div>
    </div>
      {resume ? (
        <div className="bg-gray-100 font-sans text-black">
          <div className="container mx-auto p-2">
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <h1 className="text-3xl text-black font-semibold">
                {resume.fullName}
              </h1>
              <p className="text-gray-600"></p>

              <hr className="my-4" />

              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">
                Experienced web developer with a passion for creating responsive
                and user-friendly websites. Proficient in HTML, CSS, JavaScript,
                and various web development frameworks.
              </p>

              <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>React</li>
                <li>Node.js</li>
                <li>Responsive Web Design</li>
              </ul>

              <h2 className="text-xl font-semibold mt-4 mb-2">Experience</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Web Developer, ABC Company
                </h3>
                <p className="text-gray-700">
                  Developed and maintained company website, implementing
                  responsive design and optimizing performance. Collaborated
                  with the design team to create visually appealing web pages.
                </p>
                <p className="text-gray-600">January 2020 - Present</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Frontend Developer, XYZ Agency
                </h3>
                <p className="text-gray-700">
                  Worked on various client projects, translating design mockups
                  into interactive web pages. Utilized modern web technologies
                  to ensure cross-browser compatibility.
                </p>
                <p className="text-gray-600">June 2018 - December 2019</p>
              </div>

              <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-gray-700">University of Example</p>
                <p className="text-gray-600">Graduated in May 2018</p>
              </div>

              <h2 className="text-xl font-semibold mt-4 mb-2">Contact</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>
                  Email:{" "}
                  <a
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    href="https://veilmail.io/e/880Hri"
                  >
                    https://veilmail.io/e/880Hri
                  </a>
                </li>
                <li>
                  LinkedIn:{" "}
                  <a
                    href={resume.linkedinURL}
                    className="text-blue-500 hover:underline"
                  >
                    linkedin.com/in/johndoe
                  </a>
                </li>
                <li>
                  GitHub:{" "}
                  <a
                    href={resume.githubURL}
                    className="text-blue-500 hover:underline"
                  >
                    johndoe.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>No resume data available.</p>
      )}
       <div className="fixed w-[50px] right-5 bottom-5">
      <div className="relative w-full h-auto">
        <button
          onClick={handlePrint}
          type="button"
          className="absolute bottom-0 rounded-full w-[40px] h-[40px] m-[4px_auto] bg-blue-500 text-white flex items-center justify-center shadow-lg"
          title="Print"
        >
          <FaPrint className="text-xl" />
        </button>
      </div>
    </div>
    </div>
  );
};

export default ResumeView;
