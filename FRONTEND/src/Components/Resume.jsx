  import React, { useEffect, useState } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';

  const Resume = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      linkedinURL:'',
      githubURL:'',
      address: '',
      summary: '',
      education: [
        {
          degree: '',
          branch: '',
          cgpa: '',
          university: '',
          startDate: '',
          endDate: '',
          currentlyPursuing: false
        }
      ],
      experience: '',
      projectDetails:'',
      skills: [], 
      achievement: '',
      coverLetter: '',
      _id:''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [showDialog, setShowDialog] = useState(true); // State to control dialog visibility

    const location = useLocation();
    // const navigate = useNavigate();

    useEffect(() => {
      if (location.state) {
        const { resumeData, isEditing } = location.state;
        console.log('Received resumeData:', resumeData); // Debug log
        if (resumeData) {
          const data = resumeData.StudentData || {};
        setFormData({
          fullName: data.fullName || '',
          address: data.address || '',
          coverLetter: data.coverLetter || '',
          education: Array.isArray(data.education) ? data.education : [],
          experience: data.experience || '',
          githubURL: data.githubURL || '',
          linkedinURL: data.linkedinURL || '',
          projectDetails: data.projectDetails || '',
          skills: Array.isArray(data.skills) ? data.skills : [],
          summary: data.summary || '',
          achievement: data.achievement || '',
          _id: resumeData._id || '',
      });
        }
        setIsEditing(isEditing);
      }
    }, [location.state]);
    

    const availableSkills = ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'Python'];

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  

    const handleEducationChange = (e, index) => {
      const updatedEducation = formData.education.map((edu, i) => {
        if (i === index) {
          return { ...edu, [e.target.name]: e.target.value };
        }
        return edu;
      });
      setFormData({ ...formData, education: updatedEducation });
    };

    const handleCheckboxChange = (index) => {
      const updatedEducation = formData.education.map((edu, i) => {
        if (i === index) {
          return { ...edu, currentlyPursuing: !edu.currentlyPursuing };
        }
        return edu;
      });
      setFormData({ ...formData, education: updatedEducation });
    };

    const addEducation = () => {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          {
            degree: '',
            branch: '',
            cgpa: '',
            university: '',
            startDate: '',
            endDate: '',
            currentlyPursuing: false
          }
        ]
      });
    };

    const removeEducation = (index) => {
      const updatedEducation = formData.education.filter((_, i) => i !== index);
      setFormData({ ...formData, education: updatedEducation });
    };

    const handleSkillChange = (e) => {
      const selectedSkill = e.target.value;
      if (selectedSkill && !formData.skills.includes(selectedSkill)) {
        setFormData({ ...formData, skills: [...formData.skills, selectedSkill] });
      }
    };

    const removeSkill = (skill) => {
      const updatedSkills = formData.skills.filter((s) => s !== skill);
      setFormData({ ...formData, skills: updatedSkills });
    };

    const navigate = useNavigate();

    const validateForm = () => {
          const errors = {};
          // if (!formData.imgFile) errors.imgFile = 'Profile picture is required';
          if (!formData.fullName) errors.fullName = 'Full name is required';
          // if (!formData.email) errors.email = 'Email is required';
          // if (!formData.phone) errors.phone = 'Mobile number is required';
        if (!formData.linkedinURL) errors.linkdinURL = 'Linkedin URL is required';
        if (!formData.githubURL) errors.githubURL = 'githubURL  is required';
          if (!formData.address) errors.address = 'Address is required';
          if (!formData.summary) errors.summary = 'Summary is required';
          if (!formData.experience) errors.experience = 'Experience is required';
          if (!formData.projectDetails) errors.projectDetails = 'projectDetails is required';
          if (!formData.skills.length) errors.skills = 'At least one skill is required';
          if (!formData.achievement) errors.achievement = 'Achievement is required';
          if (!formData.coverLetter) errors.coverLetter = 'Cover letter is required';
      
          formData.education.forEach((edu, index) => {
            if (!edu.degree) errors[`degree-${index}`] = 'Degree is required';
            if (!edu.branch) errors[`branch-${index}`] = 'Branch is required';
            if (!edu.cgpa) errors[`cgpa-${index}`] = 'CGPA is required';
            if (!edu.university) errors[`university-${index}`] = 'University is required';
            if (!edu.startDate) errors[`startDate-${index}`] = 'Start year is required';
            if (!edu.currentlyPursuing && !edu.endDate) errors[`endDate-${index}`] = 'End year is required if not currently pursuing';
          });
      
          setErrors(errors);
          return Object.keys(errors).length === 0;
        };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        alert('Please fill all the required fields.');
        return;
      }
      const formDataToSend = new FormData();
      const userId = localStorage.getItem('userId'); // Get the user ID from local storage
      const userID = localStorage.getItem('userID');
      // formDataToSend.append('imgFile', formData.imgFile);
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('linkedinURL', formData.linkedinURL);
      formDataToSend.append('githubURL', formData.githubURL);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('summary', formData.summary);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('projectDetails', formData.projectDetails);
      formDataToSend.append('skills', JSON.stringify(formData.skills));
      formDataToSend.append('achievement', formData.achievement);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('education', JSON.stringify(formData.education));
      formDataToSend.append('userId', userId);
      formDataToSend.append('userID' , userID);

      const { _id } = formData;

      try {
        const url = isEditing 
        ? `http://localhost:5000/api/StudentData/${_id}` 
        : 'http://localhost:5000/api/StudentData';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST', // Use PUT for update, POST for create
        body: formDataToSend,
      });
        if (response.ok) {
          const result = await response.json();
          //localStorage.setItem('ResumeData', JSON.stringify(result.StudentData || result.Studentdata));

          const resumeId = result.StudentData._id;
        localStorage.setItem('resumeId', resumeId); // Store the ID in localStorage
        // alert('Resume created successfully');
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            navigate(isEditing ? '/Profile' : '/StudentLogIn', { state: result.StudentData || result.Studentdata });
          }, 2000);
        } else {
          const errorResult = await response.json();
          console.error('Server responded with an error:', errorResult.message || 'Unknown error');
          alert(errorResult.message || 'An error occurred while submitting the resume.');
        }
      } catch (error) {
        console.error('Error submitting resume:', error);
        alert('Error submitting resume. Please try again.');
      }
    };
    const handleCloseDialog = () => {
      setShowDialog(false); // Close the dialog
    };
    
     
    return (
      <div className="bg-black w-full h-full flex flex-col items-center justify-center max-[600px]:w-full">
      {showDialog ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-black font-bold mb-4">Resume Creation Instructions</h2>
            <p className="mb-4 text-black">Please follow the steps to create your resume properly...</p>
            <button
              onClick={handleCloseDialog}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              OK
            </button>
          </div>
        </div>
      ) : (
      <div className="bg-black w-full h-full flex flex-col bg-current items-center justify-center max-[600px]:w-full">
        {showPopup && (
          <div className="fixed z-[999] inset-0 flex items-center justify-center">
          <div className="bg-black text-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Success</h3>
            <p>Your resume has been {isEditing ? 'updated' : 'created'}.</p>
          </div>
        </div>
        )}
        <div className="w-full max-w-md m-2 backdrop-blur-md bg-white/40 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">{isEditing ? 'Update Resume' : 'Create Resume'}.</h2>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {errors.imgFile && <span className="text-red-500">{errors.imgFile}</span>}
            <div className='flex flex-col'>
              <label>Full Name:</label>
              <input
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-3 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
            <div className='flex flex-col'>
              <label>Linkdin URL:</label>
              <input
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-3 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="linkedinURL"
                value={formData.linkedinURL}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.linkdinURL && <span className="text-red-500">{errors.linkdinURL}</span>}
            <div className='flex flex-col'>
              <label>githubURL:</label>
              <input
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-3 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="githubURL"
                value={formData.githubURL}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.githubURL && <span className="text-red-500">{errors.githubURL}</span>}
            <div className='flex flex-col'>
              <label>Address:</label>
              <input
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-3 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.address && <span className="text-red-500">{errors.address}</span>}
            <div className='flex flex-col'>
              <label>About Summary:</label>
              <textarea
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-3 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="summary"
                value={formData.summary}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.summary && <span className="text-red-500">{errors.summary}</span>}
            {formData.education && formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Education {index + 1}</h3>
                <div className='flex flex-col'>
                  <label>Degree:</label>
                  <input
                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                {errors[`degree-${index}`] && <span className="text-red-500">{errors[`degree-${index}`]}</span>
                }
                <div className='flex flex-col'>
                  <label>Branch:</label>
                  <input
                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    name="branch"
                    value={edu.branch}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                {errors[`branch-${index}`] && <span className="text-red-500">{errors[`branch-${index}`]}</span>}
                <div className='flex flex-col'>
                  <label>CGPA:</label>
                  <input
                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    name="cgpa"
                    value={edu.cgpa}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                {errors[`cgpa-${index}`] && <span className="text-red-500">{errors[`cgpa-${index}`]}</span>}
                <div className='flex flex-col'>
                  <label>University:</label>
                  <input
                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="text"
                    name="university"
                    value={edu.university}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                {errors[`university-${index}`] && <span className="text-red-500">{errors[`university-${index}`]}</span>}
                <div className='flex flex-col'>
                  <label>Start Year:</label>
                  <input
                    className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    type="number"
                    name="startDate"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                {errors[`startDate-${index}`] && <span className="text-red-500">{errors[`startDate-${index}`]}</span>}
                {!edu.currentlyPursuing && (
                  <div className='flex flex-col'>
                    <label>End Year:</label>
                    <input
                      className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="number"
                      name="endDate"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(e, index)}
                    />
                  </div>
                )}
                {errors[`endDate-${index}`] && <span className="text-red-500">{errors[`endDate-${index}`]}</span>}
                <div className='flex flex-col'>
                  <label>
                    <input
                      type="checkbox"
                      checked={edu.currentlyPursuing}
                      onChange={() => handleCheckboxChange(index)}
                    />{' '}
                    Currently Pursuing
                  </label>
                </div>
                {index > 0 && (
                  <button type="button" className="bg-red-500 text-white p-2 mt-2 rounded-md" onClick={() => removeEducation(index)}>
                    Remove Education
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white p-2 mb-4 rounded-md"
              onClick={addEducation}
            >
              Add Education
            </button>
            <div className='flex flex-col'>
              <label>Experience:</label>
              <textarea
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="experience"
                value={formData.experience}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='flex flex-col'>
              <label>projectDetails:</label>
              <textarea
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="projectDetails"
                value={formData.projectDetails}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.projectDetails && <span className="text-red-500">{errors.projectDetails}</span>}
            <div className='flex flex-col'>
              <label>Skills:</label>
              <div className="flex flex-wrap mb-4">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-gray-900 p-2 rounded-full mr-2 mb-2 flex items-center">
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => removeSkill(skill)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <select
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                onChange={handleSkillChange}
              >
                <option value="">Select a skill</option>
                {availableSkills.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            {errors.skills && <span className="text-red-500">{errors.skills}</span>}
            <div className='flex flex-col'>
              <label>Achievements:</label>
              <textarea
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="achievement"
                value={formData.achievement}
                onChange={(e) => handleChange(e)}
              />
            </div>
            {errors.achievement && <span className="text-red-500">{errors.achievement}</span>}
            <div className='flex flex-col mb-2'>
              <label>Cover Letter:</label>
              <textarea
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => handleChange(e)}
              />
              {errors.coverLetter && <span className="text-red-500">{errors.coverLetter}</span>}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              {isEditing ? 'Update Resume' : 'Create Resume'}
            </button>
          </form>
        </div>
      </div>
      )}
      </div>
    );
  };
  export default Resume;
