// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Menu, MenuItem } from "@mui/material";
// import { GrDocumentUser } from "react-icons/gr";
// import { useNavigate } from "react-router-dom";

// const Candidates = () => {
//   const [applications, setApplications] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedAction, setSelectedAction] = useState(null);
//   const [filteredApplications, setFilteredApplications] = useState([]);

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/applications");
//         const fetchedApplications = response.data;
//         setFilteredApplications(fetchedApplications.filter(app => app.status === 'Accepted'));
//         setApplications(fetchedApplications);
//         console.log("fetch application data",response.data);
//         // Filter to show only applications with status 'pending'
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//       }
//     };

//     fetchApplications();
//   }, []);

//   const handleRowClick = (application) => {
//     setSelectedApplication(application);
//     setOpenDialog(true);
//   };

//   const handleStatusChange = (action) => {
//     if (!selectedApplication || !selectedApplication._id) {
//       console.error("No selected application or missing _id");
//       return;
//     }
//      console.log('action: ', action)
//     // Update status in the backend
//     axios.put(`http://localhost:5000/api/applications/${selectedApplication._id}`, { statusByCompany: action })
//       .then(response => {
//         const updatedApplication = response.data; // Get the updated application from the response
//         setFilteredApplications(filteredApplications.map(app =>
//           app._id === updatedApplication._id ? updatedApplication : app
//         ));
//         setSelectedAction(action);
//         setAnchorEl(null);
//       })
//       .catch((error) => {
//         console.error("Error updating application status:", error);
//       });
//   }

//   const handleMenuClick = (event,application) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedApplication(application); 
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   const navigate = useNavigate()
//   const handleResumeClick = (application) => {
//    navigate('/ViewResume', { state: { resumeId: application.userId.resumeId } });
//   };


//   return (
//     <div className="flex flex-col items-center justify-center text-zinc-900 p-4 capitalize">
//       <h2 className="text-2xl font-bold mb-4 text-white">Applicant Selected By HR</h2>

//       <table className="min-w-[90vw] border-collapse block md:table">
//         <thead className="block md:table-header-group">
//           <tr className="border border-gray-500 md:border-none block md:table-row">
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">S.No</th>
//             {/* <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Company Name</th> */}
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Job Title</th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Candidate Name</th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Resume</th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Actions</th>
//           </tr>
//         </thead>

//         <tbody className="block md:table-row-group">
//           {filteredApplications.map((application, index) => (
//             <tr 
//               key={application._id} 
//               className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100 "
             
//             >
//               <td  className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{index + 1}</td>
//               {/* <td   className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.jobId.companyName}</td> */}
//               <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.jobId.jobTitle}</td>
//               <td onClick={() => handleRowClick(application)} className="p-2 cursor-pointer  md:border md:border-gray-500 text-left block md:table-cell">{application.userId.fullname}</td>
//               <td  onClick={() => handleResumeClick(application)} className="p-2 md:border md:border-gray-500 text-left text-red-700 block md:table-cell cursor-pointer "><GrDocumentUser /></td>
//               <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
//                 <Button onClick={(event) => handleMenuClick(event, application)}  aria-controls="simple-menu" aria-haspopup="true">
//                   Actions
//                 </Button>
//                 <Menu
//                   id="simple-menu"
//                   anchorEl={anchorEl}
//                   keepMounted
//                   open={open}
//                   onClose={handleMenuClose}
//                 >
//                   <MenuItem onClick={() => handleStatusChange('Under Process')}>Accept</MenuItem>
//                   <MenuItem onClick={() => handleStatusChange('Rejected')}>Reject</MenuItem>
//                   <MenuItem onClick={() => handleStatusChange('Hire')}>Hire</MenuItem>
//                 </Menu>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Dialog for application details */}
//       {selectedApplication && (
//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//           <DialogTitle>Application Details</DialogTitle>
//           <DialogContent className="capitalize">
//             <div className="text-lg font-semibold mb-2">
//               Company: {selectedApplication.jobId.companyName}
//             </div>
//             <div className="text-md mb-2">
//               Job Title: {selectedApplication.jobId.jobTitle}
//             </div>
//             <div className="text-md mb-2">
//               Candidate Name: {selectedApplication.userId.fullname}
//             </div>
//             <div className="text-md mb-2">
//               HR Name: {selectedApplication.hrName}
//             </div>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default Candidates;
