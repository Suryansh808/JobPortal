import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Menu, MenuItem } from "@mui/material";
import { FiFileText } from "react-icons/fi";

const ApplicantList = ({ userId }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applications`);
        const fetchedApplications = response.data;
        setFilteredApplications(fetchedApplications.filter(app => app.status === 'pending'));
        setApplications(fetchedApplications);
        // Filter to show only applications with status 'pending'
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [userId]);

  const handleRowClick = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleStatusChange = (action) => {
    // Update status in the backend
    axios.put(`http://localhost:5000/api/applications/${selectedApplication._id}`, { status: action })
      .then(() => {
        // Update state with new status
        setApplications(applications.map(app =>
          app._id === selectedApplication._id ? { ...app, status: action } : app
        ));
        setSelectedAction(action);
        setAnchorEl(null);
      })
      .catch((error) => {
        console.error("Error updating application status:", error);
      });
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
      <h2 className="text-2xl font-bold mb-4 text-white">All Applicant Details</h2>

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">S.No</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Company Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Job Title</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Candidate Email</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">HR Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Actions</th>
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
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                <Button onClick={handleMenuClick} aria-controls="simple-menu" aria-haspopup="true">
                  Actions
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleStatusChange('Accepted')}>Accept</MenuItem>
                  <MenuItem onClick={() => handleStatusChange('Rejected')}>Reject</MenuItem>
                </Menu>
              </td>
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
            <div className="text-md mb-2">
              Status: {selectedApplication.status}
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

export default ApplicantList;
