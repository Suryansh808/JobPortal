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

      const response = await axios.get(`http://localhost:5000/api/applications?userId=${userId}`);
      const applications = response.data;
      console.log("Applications data:", applications);
      if (response.status === 200) {
        setJobApplications(applications);
        if (applications.length > 0) {
          setSelectedApplication(applications[0]); // Default to the first application
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

  return (
    <div className="p-6">
      {/* Job Applications Section */}
      <div className="border shadow-md rounded-lg p-6">
        <Link to="/Profile" className="flex items-center justify-end">Back</Link>
        <h2 className="text-2xl text-center font-bold mb-4">Job Applied Status:</h2>
        <div className="flex">
          {/* Left Side: Application List */}
          <div className="flex-none w-1/3 border-r border-gray-200 pr-4">
            {jobApplications
              .filter((application) => application.status === "Accepted" || application.status === "Rejected")
              .map((application) => (
                <div
                  key={application._id}
                  className={`flex items-center text-black p-4 mb-2 cursor-pointer rounded-lg ${
                    selectedApplication && selectedApplication._id === application._id
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
                    <div className="font-semibold">{application.jobId.companyName}</div>
                    <div>{application.jobId.jobTitle}</div>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Side: Application Details */}
          <div className="flex-1 pl-4">
            {selectedApplication ? (
              <div className="bg-gray-200 text-black h-full rounded-lg p-4 ">
                <h3 className="text-xl font-bold mb-2">{selectedApplication.jobId.jobTitle}</h3>
                <p><span className="font-semibold">Company:</span> {selectedApplication.jobId.companyName}</p>
                <p><span className="font-semibold">Location:</span> {selectedApplication.jobId.location}</p>
                <p><span className="font-semibold">Job Type:</span> {selectedApplication.jobId.jobType}</p>
                <p><span className="font-semibold">Status:</span> 
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
                {/* Add more details as needed */}
              </div>
            ) : (
              <p>Select a job application to see the details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllApplicationStatus;
