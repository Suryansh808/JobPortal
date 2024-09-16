import React from 'react';
import { useLocation } from 'react-router-dom';

const ResumePreview = () => {
  const { state } = useLocation();
  const resumeDetails = state?.resumeDetails;
//   const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-10 mt-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Resume Preview</h1>

         {/* Back Button */}
      {/* <button 
        onClick={() => navigate(-1)} 
        className="mb-6 text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded"
      >
        Back to Profile
      </button>
       */}
      {resumeDetails ? (
        <div className="resume-container">
          {/* Profile Image and Name */}
          <div className="flex items-center space-x-6 mb-8">
            <img
              src={`http://localhost:5000${resumeDetails.imgURL}`}
              alt="Profile"
              className="w-32 h-32 rounded-full shadow-md object-cover"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">{resumeDetails.fullName}</h2>
              <p className="text-lg text-gray-600">{resumeDetails.linkdinURL}</p>
              <p className="text-lg text-gray-600">{resumeDetails.githubURL}</p>
              <p className="text-lg text-gray-600">{resumeDetails.email}</p>
              <p className="text-lg text-gray-600">{resumeDetails.phone}</p>
              <p className="text-lg text-gray-600">{resumeDetails.address}</p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Summary</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resumeDetails.summary}</p>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Education</h3>
            {resumeDetails.education && resumeDetails.education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-gray-700">{edu.degree}, {edu.branch}</h4>
                <p className="text-lg text-gray-600">{edu.university}</p>
                <p className="text-lg text-gray-600">CGPA: {edu.cgpa}</p>
                <p className="text-lg text-gray-600">Duration: {edu.startDate} - {edu.endDate ? edu.endDate : 'Currently Pursuing'}</p>
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Experience</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resumeDetails.experience}</p>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Skills</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resumeDetails.skills}</p>
          </div>

          {/* Achievements Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Achievements</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resumeDetails.achievement}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No resume data available</p>
      )}
    </div>
  );
};
export default ResumePreview;
