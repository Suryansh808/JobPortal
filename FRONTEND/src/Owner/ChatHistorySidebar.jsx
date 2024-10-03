import React, { useEffect, useState } from 'react';
 import { useNavigate } from 'react-router-dom';


const ChatHistorySidebar = ({ onHrClick }) => {
  const [hrs, setHrs] = useState([]);
  const [selectedHr, setSelectedHr] = useState(null);  // Selected HR
  const [assignedJobs, setAssignedJobs] = useState([]);  // Jobs assigned to selected HR

   const navigate = useNavigate();

  const fetchHrs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hr'); // Replace with actual API endpoint
      const data = await response.json();
      setHrs(data);
    } catch (error) {
      console.error('Error fetching HR list:', error);
    }
  };
  // Fetch the jobs assigned to a particular HR
  const fetchAssignedJobs = async (hrName) => {
    try {
      setAssignedJobs([]);
      const response = await fetch(`http://localhost:5000/api/jobs?hrName=${hrName}`); // Adjust API to filter by hrId
      const data = await response.json();
      console.log('jobs for HR name ${hrName}:',data);
      setAssignedJobs(data); // Save the assigned jobs for the clicked HR
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
   // When HR is clicked, fetch the jobs assigned to that HR
   const handleHrClick = (hr) => {
    setSelectedHr(hr); // Set the clicked HR
    fetchAssignedJobs(hr); // Fetch jobs for the clicked HR
  };

  useEffect(() => {
    fetchHrs();
  }, []);

 

  return (
    <div className="fixed top-[5vh] left-0 bg-gray-700 text-white w-60 transform transition-transform duration-300 ease-in-out z-50">
    <button className="text-xl p-4 text-left w-full">&times;</button>
    <ul className="p-4">
      {hrs.map(hr => (
        <li
          key={hr._id}
          className="mb-4 cursor-pointer hover:bg-gray-600"
          onClick={() => handleHrClick(hr)}  // Fetch jobs on HR click
        >
          {hr.hrName}
        </li>
      ))}
    </ul>

    {/* Display jobs only if an HR is selected and jobs are assigned */}
    {selectedHr && (
      <div className="p-4">
        <h3 className="text-lg font-bold">Jobs assigned to this HR:</h3>
        {assignedJobs.length > 0 ? (
          <ul>
            {assignedJobs.map(job => (
              <li key={job._id} className="mb-2">
                <p>{job.jobTitle}</p>
                <p>{job.companyName}</p>
                <p>{job.jobType}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs assigned to this HR.</p>  // Display if no jobs are assigned
        )}
      </div>
    )}
  </div>
);
};


export default ChatHistorySidebar;
