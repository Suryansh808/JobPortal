import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for data fetching
import { Tooltip } from '@mui/material';
import { FiFileText } from 'react-icons/fi'; // Using react-icons for the resume icon

const SelectedByCompany = () => {
    return (
        <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Candidate Selected By Company</h2>
            
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Sl No
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            User Name
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                           Contact No
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Email
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            Resume
                        </th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
                            PLAN
                        </th>

                    </tr>
                </thead>

                <tbody className="block md:table-row-group">
                    <tr className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
                        <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                        
                        </td>
                        <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                          
                        </td>
                        <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                       
                        </td>
                        <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                           
                        </td>
                        <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                           <button></button>
                        </td>
                        <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                           
                        </td>
                       
                       
            
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SelectedByCompany;






