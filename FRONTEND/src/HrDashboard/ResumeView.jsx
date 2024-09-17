import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResumeView = () => {
  const location = useLocation();
  const { resumeId } = location.state || {}; 
  
  console.log("get the id ", resumeId);
  
  const [resume, setResume] = useState(null); // State to store resume data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId) {
        setError('Resume ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/resumes/${resumeId}`);
        console.log("getting resume data",response.data);
        if (!response.ok) {
          throw new Error('Resume not found');
        }
        const data = await response.json();
        console.log("resume data ",data);
        setResume(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Resume Details</h1>
      {resume ? (
        <div>
          <h2>{resume.fullname}'s Resume</h2>
          <p>Email: {resume.email}</p>
          <p>Phone: {resume.phone}</p>
          {/* Render additional resume details here */}
        </div>
      ) : (
        <p>No resume data available.</p>
      )}
    </div>
  );
};

export default ResumeView;
