// import React, { useEffect, useState } from 'react';

// const HRUpdates = () => {
//   const [data, setData] = useState([]);

//   // Fetch data from the HR portal
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Replace with your API endpoint to fetch data
//       const response = await fetch('https://your-api-endpoint.com/hr-updates');
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error('Error fetching HR updates:', error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">HR Updates</h1>
//       <div className="overflow-x-auto">
//       <table className="min-w-full border-collapse block md:table">
//   <thead className="block md:table-header-group">
//     <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
//       <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//         Job Title
//       </th>
//       <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//         Status
//       </th>
//       <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//         Applicant Name
//       </th>
//       <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//         Date Applied
//       </th>
//     </tr>
//   </thead>
//   <tbody className="block md:table-row-group">
//             {data.length > 0 ? (
//               data.map((item, index) => (
//                 <tr key={index} className=''>
//                   <td className="py-2 px-4 border-b">{item.updateId}</td>
//                   <td className="py-2 px-4 border-b">{item.jobTitle}</td>
//                   <td className="py-2 px-4 border-b">{item.applicantName}</td>
//                   <td className={`py-2 px-4 border-b ${item.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
//                     {item.status}
//                   </td>
//                   <td className="py-2 px-4 border-b">{new Date(item.date).toLocaleDateString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="py-2 px-4 text-center">No updates available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default HRUpdates;



import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HRUpdates = () => {
  const [data, setData] = useState([]);

  // Fetch data from the HR portal
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Replace with your API endpoint to fetch data
      const response = await fetch('https://your-api-endpoint.com/hr-updates');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching HR updates:', error);
    }
  };


  const [companyName, setCompanyName] = useState(null); 
  useEffect(() => {
    const fetchCompanyNameAndJobs = async () => {
      // Fetch company name from localStorage
      const storedCompanyName = localStorage.getItem('companyName');
      if (storedCompanyName) {
        console.log("Company name fetched from localStorage:", storedCompanyName); // Debugging line
        setCompanyName(storedCompanyName); // Set the companyName state

        // Proceed to fetch jobs after setting companyName
        try {
          console.log(`Requesting jobs for company: ${storedCompanyName}`); // Debugging line to ensure correct URL
          const encodedCompanyName = encodeURIComponent(storedCompanyName.trim());
          console.log(`Requesting jobs for encoded company: ${encodedCompanyName}`); // Debugging line

          // Fetch jobs from API based on company name
          const response = await axios.get(`http://localhost:5000/api/jobs/${encodedCompanyName}`);
          console.log("API Response:", response.data); // Debugging line
          setData(response.data.filter(job => job.jobtoadmin));
          console.log("Fetched from database:", response.data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      } else {
        console.log("Company name is missing in localStorage."); // Debugging line
      }
    };
    fetchCompanyNameAndJobs(); // Invoke the combined function
  }, []); 



  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Posted Jobs</h2>
      
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
        <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Title
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Location
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Desired Skills
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
             No of Position
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Application Deadline
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.jobTitle}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.location}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.desiredSkills}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.noofposition}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.applicationDeadline}
                </td>
                <td className="p-2 md:border md:border-gray-500  text-black text-left block md:table-cell">
                 <button className='cursor-pointer'>Details</button>
                </td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 text-center text-sm text-gray-500">
                No updates available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HRUpdates;

