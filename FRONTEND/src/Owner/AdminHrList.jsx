import React, { useEffect, useState } from 'react';

const HRUpdates = () => {
  const [hrName, setHrName] = useState('');
  const [hrUserId, setHrUserId] = useState('');
  const [hrNumber, setHrNumber] = useState('');
  const [hrPassword, setHrPassword] = useState('');
  const [message, setMessage] = useState('');
  const [hrs, setHrs] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/hr/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hrName, hrUserId, hrNumber, hrPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('HR created successfully');
        setHrName('');
        setHrUserId('');
        setHrNumber('');
        setHrPassword('');
        fetchHrs(); // Fetch the updated list after creation
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const fetchHrs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hr');
      const data = await response.json();
      setHrs(data);
      console.log("HR data:", data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchHrs(); // Fetch the list of HRs when the component mounts
  }, []);

  return (
    <div id='HrList' className="flex flex-col items-center justify-center text-white p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Create New Hr Account</h2>
      <div className='bg-white text-black px-5 py-10 rounded-full'>
        <form onSubmit={handleSubmit} className='flex items-center justify-cente text-black'>
          <label>
            HR NAME:
            <input
              type="text"
              value={hrName}
              onChange={(e) => setHrName(e.target.value)}
              className='text-black border  rounded-full px-1 py-2'
            />
          </label>
          <label>
            HR EMAIl ID:
            <input
              type="email"
              value={hrUserId}
              onChange={(e) => setHrUserId(e.target.value)}
              className='text-black border  rounded-full px-1 py-2'
            />
          </label>
          <label>
            HR Number:
            <input
              type="number"
              value={hrNumber}
              onChange={(e) => setHrNumber(e.target.value)}
              className='text-black border  rounded-full px-1 py-2'
            />
          </label>
          <label>
            HR PASSWORD:
            <input
              type="password"
              value={hrPassword}
              onChange={(e) => setHrPassword(e.target.value)}
              className='text-black border  rounded-full px-1 py-2'
            />
          </label>
          <button type="submit" className='text-black border rounded-full px-2 py-2'>SUBMIT</button>
          {!message && <p>{message}</p>}
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-1 mt-5 text-white">HR LIST</h2>
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Sl No
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              HR NAME
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              HR USER ID
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              HR NUMBER
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              HR PASSWORD
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {hrs.map((hr, index) => (
            <tr key={hr._id} className="bg-gray-300 border text-black border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{index + 1}</td>
              <td className=" p-2 capitalize text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{hr.hrName}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{hr.hrUserId}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{hr.hrNumber}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{hr.hrPassword}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRUpdates;
