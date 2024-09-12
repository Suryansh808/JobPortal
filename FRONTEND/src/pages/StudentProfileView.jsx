import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import application from "../../../BACKEND/models/application";

const StudentProfileView = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    major: "Computer Science",
    year: "Senior",
  });

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
      {/* Student Details Section */}
      <div className="border shadow-md rounded-lg p-6 mb-2">
        <div className="flex items-center justify-end">
          <Link to="/Profile">Back</Link>
        </div>
        <h2 className="text-2xl font-bold mb-2">Student Profile</h2>
        <div className="text-lg">
          <p><span className="font-semibold">Name:</span> {studentDetails.name}</p>
          <p><span className="font-semibold">Email:</span> {studentDetails.email}</p>
          <p><span className="font-semibold">Major:</span> {studentDetails.major}</p>
          <p><span className="font-semibold">Year:</span> {studentDetails.year}</p>
        </div>
      </div>

      {/* Job Applications Section */}
      <div className="border shadow-md rounded-lg p-6">
  <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
  
  <div className="overflow-x-auto rounded-md">
    <table className="min-w-full bg-white text-black border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b border-gray-200">Company Logo</th>
          <th className="px-4 py-2 border-b border-gray-200">Company Name</th>
          <th className="px-4 py-2 border-b border-gray-200">Job Title</th>
          <th className="px-4 py-2 border-b border-gray-200">Location</th>
          <th className="px-4 py-2 border-b border-gray-200">Job Type</th>
          <th className="px-4 py-2 border-b border-gray-200">Status</th>
        </tr>
      </thead>
      <tbody>
        {jobApplications
        .filter((application) => application.status === "pending")
        .map((application) => (
          <tr key={application._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border-b border-gray-200">
              <img
                src={`http://localhost:5000/${application.jobId.companyLogo}`} // Display company logo
                alt={application.jobId.companyName}
                className="w-10 h-10 rounded-full"
              />
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              {application.jobId.companyName}
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              {application.jobId.jobTitle}
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              {application.jobId.location}
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              {application.jobId.jobType}
            </td>
            <td className="px-4 py-2 border-b border-gray-200">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  application.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : application.status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800" // Handle rejected status
                }`}
              >
                {application.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default StudentProfileView;
