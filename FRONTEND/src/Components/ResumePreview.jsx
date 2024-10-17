import React from 'react';

const ResumePreview = ({ resumeDetails }) => {
  const resume = resumeDetails[0]; // Access the first item in the array
  console.log("resume id in the resume preview",resume._id);

  return (
    <div className="px-3">
      {resume ? (
        <div className="resume-container px-3 h-screen overflow-y-auto scrollbar-hide ">
          {/* Profile Information */}
          <div className="flex items-center space-x-6 mb-3">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">{resume.fullName}</h2>
              <p className="text-lg text-gray-600">Address: {resume.address}</p>
              <p className="text-lg text-gray-600">LinkedIn: {resume.linkedinURL}</p>
              <p className="text-lg text-gray-600">GitHub: {resume.githubURL}</p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Summary</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resume.summary}</p>
          </div>

          {/* Cover Letter Section */}
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Cover Letter</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resume.coverLetter}</p>
          </div>

          {/* Education Section */}
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Education</h3>
            {resume.education && resume.education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-xl font-semibold text-gray-700">{edu.degree}, {edu.branch}</h4>
                <p className="text-lg text-gray-600">{edu.university}</p>
                <p className="text-lg text-gray-600">CGPA: {edu.cgpa}</p>
                <p className="text-lg text-gray-600">Duration: {edu.startDate} - {edu.endDate ? edu.endDate : 'Currently Pursuing'}</p>
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-2">Experience</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resume.experience}</p>
          </div>

          {/* Skills Section */}
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Skills</h3>
            {resume.skills && (
              <ul className="list-disc list-inside">
                {resume.skills.map((skill, index) => (
                  <li key={index} className="text-lg text-gray-700">{skill}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Achievements Section */}
          <div className="mb-3">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Achievements</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resume.achievement}</p>
          </div>

          {/* Project Details Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 border-b-2 pb-2 mb-4">Projects</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{resume.projectDetails}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No resume data available</p>
      )}
    </div>
  );
};

export default ResumePreview;
