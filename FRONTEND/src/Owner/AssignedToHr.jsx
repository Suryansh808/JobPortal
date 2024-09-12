
import React, { useEffect, useState } from "react";




const AssignedToHr = () => {
  const [companyjobs, setCompanyJobs] = useState([]);
  const [message, setMessage] = useState('');

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      if (response.ok) {
        //setCompanyJobs(data);
        console.log(data);
        setCompanyJobs(data.filter(job => job.admintohr === true));
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs when the component mounts
  }, []);


  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Job Listings</h2>
      {!message && <p className="text-red-500">{message}</p>}
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Company Logo
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Posted By
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Title
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Location
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Type
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Ending Date
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              HR Name
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {companyjobs.length > 0 ? (
            companyjobs.map((job) => (
              <tr className="bg-gray-300 border border-gray-500 md:border-none block md:table-row">
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  <img className="w-10" src={`http://localhost:5000/${job.companyLogo}`} alt="companyLogo" />
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {job.companyName}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {job.jobTitle}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {job.location}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {job.jobType}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {job.applicationDeadline}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {job.hrName}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 text-center">No jobs available</td>
            </tr>
          )}
        </tbody>
      </table>



    </div>
  );
};

export default AssignedToHr;
