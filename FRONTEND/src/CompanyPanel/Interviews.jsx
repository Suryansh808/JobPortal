import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Interviews = () => {
  const [FilteredApplications,  setFilteredApplications] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applications");
        const fetchedApplications = response.data;
        fetchedApplications.forEach(app => {
          console.log(app); // Log the entire application object
        })
        // setApplications(fetchedApplications);
        // console.log("Fetched applications: ", fetchedApplications); // Log the fetched data

      // setApplications(fetchedApplications);

      // Check the status of each application
      fetchedApplications.forEach(app => {
        console.log(`Application ID: ${app._id}, Status by Company: ${app.statusByCompany}`); // Accessing correct field
      });
     // Filter to show only applications with status 'accepted'
     const acceptedApplications = fetchedApplications.filter(app => app.statusByCompany === 'Accepted');
     setFilteredApplications(acceptedApplications);
        console.log("accepted by company ", acceptedApplications);
        // Filter to show only applications with status 'accepted'
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Interview update </h2>
      
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Candidate Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Role
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Round 1
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Round 2
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Round 3
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Notes
            </th>
            
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {FilteredApplications.length > 0 ? (
            FilteredApplications.map((item, index) => (
              <tr key={index} className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.userId.fullname}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.jobId.jobTitle}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                 
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                 
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-2 text-center text-sm text-gray-500">
                No updates available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Interviews;
