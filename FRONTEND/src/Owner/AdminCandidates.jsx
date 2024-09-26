import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFile } from "react-icons/fa6";
const Candidate = () => {

    const [candidates, setCandidates] = useState([]);
    const fetchAllUser = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/allUser');
          const data = await response.json();
          setCandidates(data);
          console.log("candidates data", data);
        } catch (error) {
            console.error(error);
        }
      };
    
      useEffect(() => {
        fetchAllUser();
      }, []);


      const navigate = useNavigate();
      const handleViewResume = (resumeId) => {
        navigate(`/Cv/${resumeId}`);
      };

    return (
        <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
           <div>
           <h2 className="text-2xl font-bold mb-4 text-white">Candidate Details</h2>
           <h1>Total User: {}</h1>
           </div>
            
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Sl No
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Profile
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                           Full Name
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Phone No
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Email Id
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Resume
                        </th>

                    </tr>
                </thead>

                <tbody className="block md:table-row-group">
                {candidates.map((user, index) => (
            <tr key={user._id} className="bg-gray-300 border text-black border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{index + 1}</td>
              <td className=" p-2 capitalize text-black font-bold md:border md:border-gray-500 text-left block md:table-cell"><img src={user.imageUrl} className='w-10 h-10 rounded-full' alt="Profile" /></td>
              <td className=" p-2 capitalize text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{user.fullname}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{user.phone}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{user.email}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell cursor-pointer" onClick={()=> handleViewResume(user.resumeId)}><FaFile className='text-red-600' /></td>
            </tr>
          ))}
                </tbody>
            </table>
        </div>
    );
};

export default Candidate;






