import { useEffect, useState } from 'react';
const HrProfile = () => {
  const [hrData, setHrData] = useState(null);
  const [error, setError] = useState(''); 

  useEffect(() => {
    // Fetch HR data when component mounts
    const fetchHrData = async () => {
      // Retrieve HRUser ID from local storage
      const hrName = localStorage.getItem('HrName');
      if (!hrName) {
        setError('User not logged in');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/hr/profile/${hrName}`);
        const data = await response.json();
        console.log('Fetched HR Data:', data);
        if (response.ok) {
          setHrData(data[0]);
          console.log(hrData);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchHrData();
  }, []);


  const students = [
    { name: 'John Doe', status: 'Hired', position: 'Software Engineer', date: '2024-09-01' },
    { name: 'Jane Smith', status: 'Rejected', position: 'Marketing Intern', date: '2024-09-05' },
    { name: 'Alex Brown', status: 'Pending', position: 'Data Analyst', date: '2024-09-10' },
  ];

  const overview = {
    totalApplied: students.length,
    totalHired: students.filter(s => s.status === 'Hired').length,
    totalRejected: students.filter(s => s.status === 'Rejected').length,
    totalPending: students.filter(s => s.status === 'Pending').length,
  };



  return (
    <div className=''>
      <h1>Welcome to your profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {hrData ? (
        <div>
          <h2>Hello, {hrData.hrName}!</h2>
          <p>Email: {hrData.hrUserId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

<div className="max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold">HR Profile</h1>
        <div>
          {/* Add more navigation items if needed */}
        </div>
      </header>
      <div className="bg-white shadow-md text-black rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Applied</h3>
            <p>{overview.totalApplied}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Hired</h3>
            <p>{overview.totalHired}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Rejected</h3>
            <p>{overview.totalRejected}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-semibold">Total Pending</h3>
            <p>{overview.totalPending}</p>
          </div>
        </div>
      </div>

      <table className="min-w-full bg-white border text-black border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Student Name</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Position Applied For</th>
            <th className="py-2 px-4 border">Date of Application</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{student.name}</td>
              <td className="py-2 px-4 border">{student.status}</td>
              <td className="py-2 px-4 border">{student.position}</td>
              <td className="py-2 px-4 border">{student.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default HrProfile;
