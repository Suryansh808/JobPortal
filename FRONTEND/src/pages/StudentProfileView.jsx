import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentProfileView = () => {
  const [jobApplications, setJobApplications] = useState([]);

  // Function to fetch job applications from the API
  const fetchJobApplications = async () => {
    try {
      const userId = localStorage.getItem("userObjectId"); // Get userId from local storage
      console.log("Retrieved userId:", userId);
      if (!userId) {
        throw new Error("userId not found in local storage");
      }

      const response = await axios.get(
        `http://localhost:5000/api/applications?userId=${userId}`
      );
      const applications = response.data;
      console.log("Applications data:", applications);
      if (response.status === 200) {
        // Filter applications where status is 'pending'
        const pendingApplications = applications.filter(app => app.status === 'pending' && app.userId._id === userId);
        console.log("pending jobs",pendingApplications);
        setJobApplications(pendingApplications);
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

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem("userObjectId");
        console.log(userId);

        if (userId) {
          // Fetch user data from backend
          const response = await axios.get(
            `http://localhost:5000/api/user/${userId}`
          );
          console.log("user data", response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6">
      <Link to="/Profile">Back</Link>
      {/* Student Details Section */}
      <div className=" flex flex-col ">
        <div className=" w-full h-[12vh] flex items-center justify-center text-white">
          <h3 className="font-bold mb-1 ">Student Profile</h3>
        </div>
        <div className="flex py-1 mt-1 flex-col items-center border-bottom mb-2 justify-center gap-1 w-full">
          {userData?.imageUrl && (
            <img
              src={userData.imageUrl}
              alt="Profile"
              className="w-[120px] h-[120px] bg-cover rounded-full shadow-2xl"
            />
          )}
          <p className="text-md font-semibold capitalize pb-2">
            {userData?.fullname}
          </p>
          <a
            href={`mailto:${userData?.email}`}
            className="text-md font-semibold pb-2 "
          >
            {userData?.email}
          </a>
          <a
            href={`tel:+${userData?.phone}`}
            className="text-md font-semibold pb-2 "
          >
            {userData?.phone}
          </a>
        </div>
      </div>
      {/* Job Applications Section */}
      <div className="border shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Job Applications</h2>

        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full bg-white text-black border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200">
                  Company Logo
                </th>
                <th className="px-4 py-2 border-b border-gray-200">
                  Company Name
                </th>
                <th className="px-4 py-2 border-b border-gray-200">
                  Job Title
                </th>
                <th className="px-4 py-2 border-b border-gray-200">Location</th>
                <th className="px-4 py-2 border-b border-gray-200">Job Type</th>
                <th className="px-4 py-2 border-b border-gray-200">Status</th>
              </tr>
            </thead>
            <tbody>
             {
              jobApplications.length > 0 ? (
                    <>
                     {jobApplications.map((application) => (
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
                    </>
              ): (
                <p>No pending application founds</p>
              )
             }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileView;
