import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Menu, MenuItem } from "@mui/material";
import { FiFileText } from "react-icons/fi";

const RejectedCandidates = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applications");
        const fetchedApplications = response.data;
        setFilteredApplications(fetchedApplications.filter(app => app.statusByCanpany === 'Rejected'));
        setApplications(fetchedApplications);
        // Filter to show only applications with status 'pending'
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleRowClick = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Applicant Rejected By Canpany</h2>

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">S.No</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Company Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Job Title</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Candidate Email</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">HR Name</th>
          </tr>
        </thead>

        <tbody className="block md:table-row-group">
          {filteredApplications.map((application, index) => (
            <tr 
              key={application._id} 
              className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100 "
             
            >
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{index + 1}</td>
              <td  onClick={() => handleRowClick(application)} className="p-2 cursor-pointer md:border md:border-gray-500 text-left block md:table-cell">{application.jobId.companyName}</td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.jobId.jobTitle}</td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.userId.email}</td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.hrName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for application details */}
      {selectedApplication && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Application Details</DialogTitle>
          <DialogContent>
            <div className="text-lg font-semibold mb-2">
              Company: {selectedApplication.jobId.companyName}
            </div>
            <div className="text-md mb-2">
              Job Title: {selectedApplication.jobId.jobTitle}
            </div>
            <div className="text-md mb-2">
              Candidate: {selectedApplication.userId.email} (Name: {selectedApplication.userId.name})
            </div>
            <div className="text-md mb-2">
              HR Name: {selectedApplication.hrName}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default RejectedCandidates;
