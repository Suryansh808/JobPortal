// import React, {useEffect, useState } from 'react';

// const HRUpdates = () => {

//   const [hrName, setHrName] = useState('');
//   const [hrUserId, setHrUserId] = useState('');
//   const [hrPassword, setHrPassword] = useState('');
//   const [message, setMessage] = useState('');
//   // const [hrs, setHrs] = useState([]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('/api/hr/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ hrName, hrUserId, hrPassword }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         setMessage('HR created successfully');
//         console.log("hr ban gya");
//         setHrName('');
//         setHrUserId('');
//         setHrPassword('');
//         fetchHrs(); // Fetch the updated list after creation
//       } else {
//         setMessage(`Error: ${result.message}`);
//         console.log("hr ni ban gya")
//       }
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   const fetchHrs = async () => {
//     try {
//       const response = await fetch('/api/hr');
//       const data = await response.json();
//       setHrs(data);
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchHrs(); // Fetch the list of HRs when the component mounts
//   }, []);


//   return (
//     <div id='HrList' className="flex flex-col items-center justify-center text-white p-4">
//       <div>
//         <form  onSubmit={handleSubmit}>
//         <div>
//       <form onSubmit={handleSubmit} >
//         <h2 className="text-2xl font-bold mb-4">Create HR</h2>
//         <label>
//           HR NAME:
//           <input
//             type="text"
//             value={hrName}
//             onChange={(e) => setHrName(e.target.value)}
//             placeholder='Enter HR name'
//             className='text-black'
//           />
//         </label>
//         <br />
//         <label>
//           HR USER ID:
//           <input
//             type="email"
//             value={hrUserId}
//             onChange={(e) => setHrUserId(e.target.value)}
//             placeholder='Enter HR user ID'
//                className='text-black'
//           />
//         </label>
//         <br />
//         <label>
//           HR PASSWORD:
//           <input
//             type="password"
//             value={hrPassword}
//             onChange={(e) => setHrPassword(e.target.value)}
//             placeholder='Enter password'
//                className='text-black'
//           />
//         </label>
//         <br />
//         <button type="submit">SUBMIT</button>
//       </form>
//       {/* {message && <p>{message}</p>} */}
//     </div>
//         </form>
//       </div>

//       <h2 className="text-2xl font-bold mb-4 text-white ">HR LIST</h2>
//       <table className="min-w-full border-collapse block md:table">
//         <thead className="block md:table-header-group">
//           <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//               Sl No
//             </th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//               HR NAME
//             </th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//               HR ID
//             </th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
//               HR PASSWORD
//             </th>
//           </tr>
//         </thead>
//         <tbody className="block md:table-row-group">
          
//               <tr className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
//                <td>01</td>
//                <td>ARAMAN</td>
//                <td>xyz@gmail.com</td>
//                <td>xyz@1234</td>
//               </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HRUpdates;

import React, { useEffect, useState } from 'react';

const HRUpdates = () => {
  const [hrName, setHrName] = useState('');
  const [hrUserId, setHrUserId] = useState('');
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
        body: JSON.stringify({ hrName, hrUserId, hrPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('HR created successfully');
        setHrName('');
        setHrUserId('');
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
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchHrs(); // Fetch the list of HRs when the component mounts
  }, []);

  return (
    <div id='HrList' className="flex flex-col items-center justify-center text-white p-4">
      <div>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Create HR</h2>
          <label>
            HR NAME:
            <input
              type="text"
              value={hrName}
              onChange={(e) => setHrName(e.target.value)}
              placeholder='Enter HR name'
              className='text-black'
            />
          </label>
          <br />
          <label>
            HR USER ID:
            <input
              type="email"
              value={hrUserId}
              onChange={(e) => setHrUserId(e.target.value)}
              placeholder='Enter HR user ID'
              className='text-black'
            />
          </label>
          <br />
          <label>
            HR PASSWORD:
            <input
              type="password"
              value={hrPassword}
              onChange={(e) => setHrPassword(e.target.value)}
              placeholder='Enter password'
              className='text-black'
            />
          </label>
          <br />
          <button type="submit">SUBMIT</button>
          {!message && <p>{message}</p>}
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-white">HR LIST</h2>
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
              HR PASSWORD
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {hrs.map((hr, index) => (
            <tr key={hr._id} className="bg-gray-300 border text-black border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
              <td>{index + 1}</td>
              <td>{hr.hrName}</td>
              <td>{hr.hrUserId}</td>
              <td>{hr.hrPassword}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRUpdates;
