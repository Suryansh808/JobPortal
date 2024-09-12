import React, { useEffect, useState } from 'react';

const Interviews = () => {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState(''); // State for the text area

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

  const handleSendData = (id) => {
    // Function to handle sending data to HR
    const dataToSend = {
      id,
      notes,
    };

    fetch('https://your-api-endpoint.com/send-to-hr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Data sent successfully:', result);
        // Optionally clear the text area or update UI
        setNotes('');
      })
      .catch(error => console.error('Error sending data:', error));
  };

  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Interview update </h2>
      
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Role
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Applied Date
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
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.name}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.jobRole}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {new Date(item.appliedDate).toLocaleDateString()}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.round1}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.round2}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  {item.round3}
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes or links here..."
                    className="w-full p-2 border border-gray-400 rounded"
                  />
                </td>
                <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                  <button
                    onClick={() => handleSendData(item.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Send to HR
                  </button>
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
