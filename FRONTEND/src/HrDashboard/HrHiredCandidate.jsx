import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HiredCandidates = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applications");
        const fetchedApplications = response.data;

        // Filtering applications with status 'Hired'
        const hiredApplications = fetchedApplications.filter(app => app.statusByCompany === 'Hired');
        setFilteredApplications(hiredApplications);

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

  const navigate = useNavigate();
  const handleViewResume = (resumeId) => {
    navigate(`/Cv/${resumeId}`);
  };
  // http://localhost:5000/api/applications/${applicationId}/offer-letter
  // Function to handle sending the offer letter to user's profile
  const handleSendOfferLetter = async (applicationId, offerLetterUrl) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/applications/${applicationId}/send-offer-letter`, {
        offerLetterUrl: offerLetterUrl
      });
      console.log('Offer letter sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending offer letter:', error);
  }
  };

  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Hired Candidates</h2>

      <table className="min-w-full border-collapse block md:table capitalize">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">S.No</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Job Title</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Candidate Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Resume</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">HR Name</th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">Offer Letter</th>
          </tr>
        </thead>

        <tbody className="block md:table-row-group">
          {filteredApplications.map((application, index) => (
            <tr key={application._id} className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100">
              <td onClick={() => handleRowClick(application)} className="p-2 cursor-pointer md:border md:border-gray-500 text-left block md:table-cell">
                {index + 1}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.jobId.jobTitle}</td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.userId.fullname}</td>
              <td onClick={() => handleViewResume(application.userId.resumeId)} className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                <FiFileText />
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">{application.hrName}</td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {application.offerLetterUrl ? (
                  <>
                    <a href={application.offerLetterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Offer Letter
                    </a>
                    <button
                      className="ml-4 bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSendOfferLetter(application._id, application.offerLetterUrl)}
                    >
                      Send to User
                    </button>
                  </>
                ) : (
                  "No Offer Letter Uploaded"
                )}
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
            <div className="text-md mb-2">Job Title: {selectedApplication.jobId.jobTitle}</div>
            <div className="text-md mb-2">HR Name: {selectedApplication.hrName}</div>
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

export default HiredCandidates;
