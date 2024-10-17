import React, { useEffect, useState } from 'react';
import {Link,  useParams } from 'react-router-dom';
import { FaPrint } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
const Cv = () => {
  const { resumeId } = useParams(); // Get resumeId from URL
  const [resumeData, setResumeData] = useState(null);
  
  useEffect(() => {
    // Fetch the resume data from your backend or database
    const fetchResumeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/studentData/${resumeId}`); // Adjust the endpoint as necessary
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setResumeData(data.StudentData);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  if (!resumeData) {
    return <div>Loading...</div>; // Handle loading state
  }
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="relative ">
      {resumeData ? (
        <div className="bg-gray-100 font-sans text-black">
          <div className="container mx-auto p-2">
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <h1 className="text-3xl text-black uppercase font-semibold">
                {resumeData.fullName}
              </h1>
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
                    href={resumeData.linkedinURL}
                    className="text-blue-500 hover:underline"
                  >
                    linkedin.com/in/johndoe
                  </a>
                </li>
                <li>
                  GitHub:{" "}
                  <a
                    href={resumeData.githubURL}
                    className="text-blue-500 hover:underline"
                  >
                    johndoe.com
                  </a>
                </li>
              </ul>
              <hr className="my-2" />
              <h2 className="text-xl font-semibold mb-2">Summary</h2>
              <p className="text-gray-700">
                {resumeData.summary}
              </p>

              <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>
              <ul className="list-disc list-inside text-gray-700">
                {resumeData.skills}
              </ul>
              <h2 className="text-xl font-semibold mt-4 mb-2">Experience : {resumeData.experience}</h2>

              <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-gray-700">University of Example</p>
                <p className="text-gray-600">Graduated in May 2018</p>
              </div>

             
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

export default Cv;
