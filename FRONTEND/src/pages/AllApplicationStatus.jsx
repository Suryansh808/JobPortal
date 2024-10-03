import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllApplicationStatus = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Function to fetch job applications from the API
  const fetchJobApplications = async () => {
    try {
      const userId = localStorage.getItem("userObjectId"); // Get userId from local storage
      console.log("Retrieved userId:", userId);
      if (!userId) {
        throw new Error("userId not found in local storage");
      }

      const response = await axios.get(
        `http://localhost:5000/api/applications`,
        {
          params: { userId: userId },
        }
      );
      const applications = response.data;
      console.log("Applications data:", applications);
      if (response.status === 200) {
        const userApplications = applications.filter(
          (app) => app.userId._id === userId
        );
        setJobApplications(userApplications);
        if (userApplications.length > 0) {
          setSelectedApplication(userApplications[0]);
        }
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  useEffect(() => {
    fetchJobApplications();
  }, []);

  const position = [51.505, -0.09];
  return (
    <div>
      <div className="flex items-center justify-between px-10 py-2 border-b mb-2">
        <h2 className="text-2xl">
         All Applications Status
        </h2>
      <Link to="/Profile">
       <span className="text-black bg-white rounded-full p-1"> &#129184;</span>
        </Link>
      </div>
      {/* Job Applications Section */}
        <div className="flex gap-1 px-2 w-full  ">
          {/* Left Side: Application List */}
          <div className="flex-none h-[90vh] rounded-lg overflow-y-scroll w-1/5 border-gray-200">
            {jobApplications.map((application) => (
              <div
                key={application._id}
                className={`flex items-center text-black p-4 mb-2 cursor-pointer rounded-lg ${
                  selectedApplication &&
                  selectedApplication._id === application._id
                    ? "bg-gray-200"
                    : application.status === "Accepted"
                    ? "bg-gray-200"
                    : "bg-gray-200"
                }`}
                onClick={() => setSelectedApplication(application)}
              >
                <img
                  src={`http://localhost:5000/${application.jobId.companyLogo}`} // Display company logo
                  alt={application.jobId.companyName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold">
                    {application.jobId.companyName}
                  </div>
                  <div>{application.jobId.jobTitle}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Right Side: Application Details */}
          <div className="flex-1 h-[90vh] rounded-lg overflow-y-scroll ">
            {selectedApplication ? (
              <div className="bg-gray-200 h-auto text-black rounded-lg px-2 py-1">
                <div className=" px-2 py-1">
                <div className="flex items-center">
                <img
                  src={`http://localhost:5000/${selectedApplication.jobId.companyLogo}`} // Display company logo
                  alt={selectedApplication.jobId.companyName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                  <div>
                <p>
                  {selectedApplication.jobId.companyName}
                </p>
                <h3 className="text-xl font-bold mb-2">
                  {selectedApplication.jobId.jobTitle}
                </h3>
                  </div>
                </div>
                
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {selectedApplication.jobId.location}
                </p>
                <p>
                  <span className="font-semibold">Job Type:</span>{" "}
                  {selectedApplication.jobId.jobType}
                </p>
                </div>
                <p>
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      selectedApplication.status === "Accepted"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedApplication.status}
                  </span>
                </p>

                <div className="w-full">
                  <dl className="border-collapse">
                    {selectedApplication.hrUpdated.round.map((round, index) => (
                      <div className="border-b" key={index}>
                        <dd className=" px-4 text-gray-700 font-semibold">
                          <span className="text-xl">&#10551;</span> {round}
                        </dd>
                        <dd className="-mt-2 px-4 mb-2 ml-10 text-gray-700">
                          {selectedApplication.hrUpdated.date[index] || "N/A"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ) : null}
          </div>
        </div>
    </div>
  );
};

export default AllApplicationStatus;
