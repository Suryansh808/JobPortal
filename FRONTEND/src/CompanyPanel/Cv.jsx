import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cv = () => {
  const { resumeId } = useParams(); // Get resumeId from URL
  const [resumeData, setResumeData] = useState(null);
  
  useEffect(() => {
    // Fetch the resume data from your backend or database
    const fetchResumeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/studentData/${resumeId}`); // Adjust the endpoint as necessary
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setResumeData(data.StudentData);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  if (!resumeData) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="resume-containe text-center">
    <h1>{resumeData.fullName}'s Resume</h1>
    <h2>Summary</h2>
    <p>{resumeData.summary}</p>
    
    <h2>Education</h2>
    {/* <ul>
      {resumeData.education.map((edu, index) => (
        <li key={index}>{edu}</li> // Adjust according to your education structure
      ))}
    </ul> */}

    <h2>Experience</h2>
    <p>{resumeData.experience}</p>

    <h2>Skills</h2>
    {/* <ul>
      {resumeData.skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul> */}

    <h2>Projects</h2>
    <p>{resumeData.projectDetails}</p>

    <h2>Achievements</h2>
    <p>{resumeData.achievement}</p>

    <h2>Cover Letter</h2>
    <p>{resumeData.coverLetter}</p>

    <h2>Address</h2>
    <p>{resumeData.address}</p>

    <h2>Links</h2>
    <p>GitHub: <a href={resumeData.githubURL} target="_blank" rel="noopener noreferrer">{resumeData.githubURL}</a></p>
    <p>LinkedIn: <a href={resumeData.linkedinURL} target="_blank" rel="noopener noreferrer">{resumeData.linkedinURL}</a></p>

    <h2>Created At</h2>
    <p>{new Date(resumeData.createdAt).toLocaleDateString()}</p>
  </div>
  );
};

export default Cv;
