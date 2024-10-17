import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HiredCandidates = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});
  const [uploadError, setUploadError] = useState();
  const [doneMessage, setDoneMessage] = useState({}); // Store done message for each application

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/applications");
        const fetchedApplications = response.data;

        // Filter to show only applications with status 'Hired'
        const hiredApplications = fetchedApplications.filter(
          (app) => app.statusByCompany === "Hired"
        );
        setFilteredApplications(hiredApplications);

        // Load upload statuses from localStorage
        const savedUploadStatus = JSON.parse(localStorage.getItem('uploadStatus')) || {};
        setUploadStatus(savedUploadStatus);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  // Handle file selectio
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file); // Store the file for upload when 'Send' is clicked
  };

  // Handle file upload on "Send" button click
  const handleSend = async (applicationId) => {
    if (!uploadedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("offerLetter", uploadedFile);

    try {
      setUploading(true); // Set uploading state

      const response = await axios.post(
        `http://localhost:5000/api/application/upload-offer-letter/${applicationId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);

      // Update upload status for this application
      const updatedStatus = { ...uploadStatus, [applicationId]: "Uploaded" };
      setUploadStatus(updatedStatus);

      // Store the upload status in localStorage
      localStorage.setItem("uploadStatus", JSON.stringify(updatedStatus));

      // Set the done message for this application
      setDoneMessage({ ...doneMessage, [applicationId]: "Done!" });

      setUploadedFile(null); // Clear the selected file
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  const handleRowClick = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const navigate = useNavigate();
  const handleViewResume = (resumeId) => {
    navigate(`/Cv/${resumeId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center text-zinc-900 p-4">
      <h2 className="text-2xl font-bold mb-4 text-white">Hired Candidates</h2>

      <table className="min-w-full border-collapse block md:table capitalize">
        <thead className="block md:table-header-group">
          <tr className="border border-gray-500 md:border-none block md:table-row">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              S.No
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Job Title
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Candidate Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Resume
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              HR Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-gray-500 text-left block md:table-cell">
              Upload Offer Letter
            </th>
          </tr>
        </thead>

        <tbody className="block md:table-row-group">
          {filteredApplications.map((application, index) => (
            <tr
              key={application._id}
              className="bg-gray-300 border border-gray-500 md:border-none block md:table-row hover:bg-gray-100"
            >
              <td
                onClick={() => handleRowClick(application)}
                className="p-2 cursor-pointer md:border md:border-gray-500 text-left block md:table-cell"
              >
                {index + 1}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {application.jobId.jobTitle}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {application.userId.fullname}
              </td>
              <td
                onClick={() => handleViewResume(application.userId.resumeId)}
                className="p-2 md:border md:border-gray-500 text-left block md:table-cell cursor-pointer"
              >
                <FiFileText />
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                {application.hrName}
              </td>
              <td className="p-2 md:border md:border-gray-500 text-left block md:table-cell">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => handleFileChange(event)} // Handle file selection
                  disabled={uploading || uploadStatus[application._id] === "Uploaded"} // Disable during upload or after uploading
                />
                <button
                  onClick={() => handleSend(application._id)} // Upload on button click
                  disabled={uploading || !uploadedFile || uploadStatus[application._id] === "Uploaded"} // Disable the button while uploading or if no file is selected
                >
                  {uploadStatus[application._id] === "Uploaded"
                    ? doneMessage[application._id] || "Uploaded"
                    : uploading
                    ? "Uploading..."
                    : "Send"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for viewing additional details */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          {/* Render details of selectedApplication */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HiredCandidates;



