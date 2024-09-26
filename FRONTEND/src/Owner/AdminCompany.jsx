import React, { useEffect, useState } from 'react';

// Simple Dialog Component
const Dialog = ({ isOpen, onClose, userDetails }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow-lg">
                <h3 className="text-xl font-bold mb-2">Company Details</h3>
                <p><strong>Company Name:</strong> {userDetails.companyName}</p>
                <p><strong>Company Type:</strong> {userDetails.companyType}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Position:</strong> {userDetails.position}</p>
                <p><strong>Additional Info:</strong> {userDetails.businessmodel}</p>
                <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const AdminCompany = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const fetchCompanyUserAll = async () => {
        try {
          const response = await fetch('http://localhost:5000/getAllCompanyUser');
          const data = await response.json();
          setCompanies(data);
          console.log("all company user data:", data);
        } catch (error) {
          setMessage(`Error: ${error.message}`);
        }
      };
    
      useEffect(() => {
        fetchCompanyUserAll();
      }, []);
    
      const handleViewClick = (user) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Company Details</h2>
            
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Sl No
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Company Profile
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Company Name
                        </th>
                        {/* <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                           Contact No
                        </th> */}
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Email
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                          Position
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                         More Details
                        </th>

                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                {companies.map((user, index) => (
            <tr key={user._id} className="bg-gray-300 border text-black border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{index + 1}</td>
              <td className=" p-2 capitalize text-black font-bold md:border md:border-gray-500 text-left block md:table-cell"><img src={`http://localhost:5000/${user.companyLogo}`} className='w-10 h-10 rounded-full' alt="Profile" /></td>
              <td className=" p-2 capitalize text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{user.companyName}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{user.email}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell">{user.position}</td>
              <td className=" p-2 text-black font-bold md:border md:border-gray-500 text-left block md:table-cell" onClick={() => handleViewClick(user)}>View</td>
            </tr>
          ))}
                </tbody>
            </table>
            <Dialog isOpen={isDialogOpen} onClose={closeDialog} userDetails={selectedUser} />
        </div>
    );
};

export default AdminCompany;






