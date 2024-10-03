import React, { useState, useEffect, useRef, useContext, startTransition } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { RiSearch2Line } from "react-icons/ri";
import CustomizedDialogs from "../layouts/CustomizedDialogs";
import { CiLocationOn } from "react-icons/ci";
import { RiHandbagLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import ApplyMsg from "./ApplyMsg";
import { ApplicationStatusContext } from '../ApplicationStatusContext';


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [noJobsFound, setNoJobsFound] = useState(false);
  const [searchParams, setSearchParams] = useState({ jobTitle: "", location: "" });
  const { setApplicationStatus } = useContext(ApplicationStatusContext);
  const [openDialog, setOpenDialog] = useState(false);
  // const [jobLimit , setJobLimit] = useState(2);
  const [dialogMessage, setDialogMessage] = useState("");
  const filtersRef = useRef(null);
  const sortRef = useRef(null);
  const categoryRef = useRef(null);



  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('There was an error fetching the jobs!', error);
      }
    };
    fetchJobs();
    const handleClickOutside = (event) => {
      if (
        filtersRef.current && !filtersRef.current.contains(event.target) &&
        sortRef.current && !sortRef.current.contains(event.target) &&
        categoryRef.current && !categoryRef.current.contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (filteredJobs.length > 0) {
      setSelectedJob(filteredJobs[0]);
      setNoJobsFound(false);
    } else {
      setSelectedJob(null);
      setNoJobsFound(true);
    }
  }, [filteredJobs]);

  const handleSearch = () => {
    const filtered = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(searchParams.jobTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(searchParams.location.toLowerCase()) &&
        (selectedTypes.length === 0 || selectedTypes.includes(job.type))
    );
    setFilteredJobs(filtered);
  };

  // Automatically filter when filter criteria change
  useEffect(() => {
    handleSearch();
  }, [searchParams, selectedTypes]);  // Trigger when searchParams or selectedTypes change

  
  const handleJobClick = (job) => {
    setSelectedJob(job);
    // alert(userId)
  };

  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const userId = localStorage.getItem('userObjectId');
  
  const hasUserApplied = (job) => {
    return job.userApplicationIds.includes(userId);
  };


  const handleApplyClick = async (job) => {

    // if (isApplying || hasApplied) return;

    // setIsApplying(true);

    const hrName = job.hrName; // Assuming hrName is part of the job object

    // Check if the user has already applied
    // if (job.userApplicationIds.includes(userId)) {
    //   setDialogMessage('You have already applied for this position.');
    //   setOpenDialog(true);
    //   setIsApplying(false);
    //   return;
    // }
    // Prepare the application data
    const applicationData = {
      jobId: job._id,
      userId: userId,
      hrName: hrName,
      status: 'Pending',
    };
    // Send the application data to the server
    try {
      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });
      if (response.ok) {
        console.log("getting updated data after click on apply btn",response.data);
        // setHasApplied(true); 
        setDialogMessage(`You have successfully applied for the position of ${job.jobTitle} at ${job.companyName}. Check your status in your profile...`);
        setOpenDialog(true);
        setApplicationStatus("We have received your application. It's under review.");
      } else {
        throw new Error('Application failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setDialogMessage('There was an error applying for the position. Please try again.');
      setOpenDialog(true);
    } 
    // finally {
    //   setIsApplying(false); // Re-enable button after operation completes
    // }
  };
  const [userApplyJob, setUserApplyJob] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applications`);
        const fetchedApplications = response.data;
        const userApplyjob = fetchedApplications.filter(application => application.userId && application.userId._id === userId);
        setUserApplyJob(userApplyjob)
        // alert(userApplyjob.length)
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [userId]);
  
  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type];

      const filtered = jobs.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(searchParams.jobTitle.toLowerCase()) &&
          job.location.toLowerCase().includes(searchParams.location.toLowerCase()) &&
          (updatedTypes.length === 0 || updatedTypes.includes(job.type))
      );
      setFilteredJobs(filtered);

      return updatedTypes;
    });
  };

  const handleDropdownToggle = (dropdownName) => {
    setDropdownOpen((prev) => (prev === dropdownName ? null : dropdownName));
  };
  // FILTER 
  const [openAlert, setOpenAlert] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Type');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEligibility, setSelectedEligibility] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSortBy, setSeletedSortBy] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [afterFilteredJobs, setAfterFilteredJobs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const renderFilterDetails = () => {
    switch (activeFilter) {
      case 'Type':
        const uniqueJobTypes = [...new Set(jobs.map(job => job.jobType))];
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Type
              <button
                onClick={() => clearFilter('Type')}
                className="text-red-500 text-sm">
                Clear
              </button>
            </h3>
            <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
              {uniqueJobTypes.map((type, i) => (
                <li key={i}>
                  <label className="flex items-center space-x-2  cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                      className="form-radio"
                    />
                    <span>{type}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Eligibility':
        // Create two options: "Fresher" and "Experience"
        const eligibilityOptions = [
          { label: "Fresher", value: "Fresher" },
          { label: "Experience", value: "Experience" }
        ];
        // Filter jobs to count how many are "Fresher" or "Experience"
        //const fresherJobs = jobs.filter(job => job.eligibility.toLowerCase() === "fresher");
        // const experienceJobs = jobs.filter(job => job.eligibility.toLowerCase() !== "fresher");

        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Eligibility
              <button
                onClick={() => clearFilter('Eligibility')}
                className="text-red-500 text-sm">
                Clear
              </button>
            </h3>
            <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
              {eligibilityOptions.map((option, i) => (
                <li key={i}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="eligibility"
                      value={option.value}
                      checked={selectedEligibility === option.value}
                      onChange={() => setSelectedEligibility(option.value)}
                      className="form-radio"
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Category':
        // Extract unique categories from the jobs data, filtering out undefined values
        const uniqueCategories = [...new Set(jobs.map(job => job.jobTitle).filter(Boolean))];
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Category
              <button
                onClick={() => clearFilter('Category')}
                className="text-red-500 text-sm">
                Clear
              </button>
            </h3>
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search Category..."
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => setCategorySearch(e.target.value.toLowerCase())}
            />
            <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
              {uniqueCategories
                .filter((category) => category && category.toLowerCase().includes(categorySearch))
                .map((category, i) => (
                  <li key={i}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="category"
                        value={category}
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="form-checkbox"
                      />
                      <span>{category}</span>
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        );
      case 'SortBy':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Sort By
              <button
                onClick={() => clearFilter('SortBy')}
                className="text-red-500 text-sm"
              >
                Clear
              </button>
            </h3>
            <ul className="space-y-2">
              <li>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sortby"
                    value="mostRecent"
                    checked={selectedSortBy === "mostRecent"}
                    onChange={() => handleSortByChange("mostRecent")}
                    className="form-checkbox"
                  />
                  <span>Most Recent</span>
                </label>
              </li>
            </ul>
          </div>
        );
      case 'Location':
        const uniqueLocation = [...new Set(jobs.map(job => job.location))];
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Location
              <button
                onClick={() => clearFilter('Location')}
                className="text-red-500 text-sm"
              >
                Clear
              </button>
            </h3>
            <input
              type="text"
              placeholder="Search Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
              {uniqueLocation
                .filter((location) =>
                  location.toLowerCase().includes(searchLocation.toLowerCase())
                )
                .map((location, i) => (
                  <li key={i}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="location"
                        value={location}
                        checked={selectedLocations.includes(location)}
                        onChange={() => handleLocationChange(location)}
                        className="form-checkbox"
                      />
                      <span>{location}</span>
                    </label>
                  </li>
                ))}
            </ul>
          </div>
        );
      default:
        return null; // No default message, as the first option will be automatically selected
    }
  };
  const clearFilter = (filterType) => {
    switch (filterType) {
      case 'Type':
        setSelectedType('');
        break;
      case 'Eligibility':
        setSelectedEligibility('');
        break;
      case 'Category':
        setSelectedCategory('');
        break;
      case 'SortBy':
        setSeletedSortBy('');
        break;
      case 'Location':
        setSelectedLocations([]);
        setSearchLocation('');
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedType('');
    setSelectedEligibility('');
    setSelectedCategory('');
    setSeletedSortBy('');
    setSelectedLocations([]);
    setSearchLocation('');
    setAfterFilteredJobs(jobs);
    setFilteredJobs(jobs);
  };

  const handleApplyFilters = () => {
    applyFilters();
    setFilteredJobs(afterFilteredJobs);
  };
  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };
  const applyFilters = () => {

    let filtered = jobs;
    // let filteredJobs = allJobs;
    // console.log("Initial Filtered:", filtered);

    // Apply Type filter
    if (selectedType) {
      filtered = filtered.filter(job => job.jobType === selectedType);
    }

    // Apply Eligibility filter
    if (selectedEligibility) {
      filtered = filtered.filter(job => job.eligibility === selectedEligibility);
    }

    // Apply Category filter
    if (selectedCategory) {
      filtered = filtered.filter(job => selectedCategory.includes(job.jobTitle));
    }

    // Apply Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter(job => selectedLocations.includes(job.location));
    }

    // Apply Sort By filter (example: most recent)
    if (selectedSortBy === 'mostRecent') {
      filtered = filtered.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));
    }

    // Update the displayed jobs
    setAfterFilteredJobs(filtered);
    setFilteredJobs(filtered);
    console.log("Filtered Jobs After Applying Filters:", filtered);
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prevSelected) =>
      prevSelected.includes(location)
        ? prevSelected.filter((loc) => loc !== location)
        : [...prevSelected, location]
    );
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleSortByChange = (sortBy) => {
    setSeletedSortBy(sortBy);

    if (sortBy === "mostRecent") {
      // Sort jobs by the 'updatedOn' date in descending order
      const sortedJobs = [...jobs].sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));
    }
  };

  // FILTER ENDS
  return (
    <div className="w-full mt-5">
      {/* Centered Container for Search Bar and Buttons */}
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center w-full gap-2">
          {/* <FilterComponent/> */}
          <div className="relative ">
            {/* Filter button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#000] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#000000e0] focus:outline-none">
              Filters
            </button>
            {/* Filter options - conditional rendering */}
            {isOpen && (
              <div className="absolute top-12 left-0 w-[30vw]  bg-white  shadow-lg p-3 z-50">
                {/* Close Icon */}
                <div className="flex justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <AiOutlineClose
                    className="w-6 h-6 text-gray-500 hover:bg-slate-100 rounded-full p-1 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <div className="flex space-x-2 border-t">
                  {/* Left side filters */}
                  <div className="w-1/3 py-3 border-r px-1">
                    <ul className="space-y-1">
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Type' ? 'font-bold' : ''} ${activeFilter === 'Type' ? 'bg-[#E5F1FC]' : ''}`}
                        onClick={() => setActiveFilter('Type')}
                      >
                        Type
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Eligibility' ? 'font-bold' : ''} ${activeFilter === 'Eligibility' ? 'bg-[#E5F1FC]' : ''}`}
                        onClick={() => setActiveFilter('Eligibility')}
                      >
                        Eligibility
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Category' ? 'font-bold' : ''} ${activeFilter === 'Category' ? 'bg-[#E5F1FC]' : ''}`}
                        onClick={() => setActiveFilter('Category')}
                      >
                        Category
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'SortBy' ? 'font-bold' : ''} ${activeFilter === 'SortBy' ? 'bg-[#E5F1FC]' : ''}`}
                        onClick={() => setActiveFilter('SortBy')}
                      >
                        Sort By
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Location' ? 'font-bold' : ''} ${activeFilter === 'Location' ? 'bg-[#E5F1FC]' : ''}`}
                        onClick={() => setActiveFilter('Location')}
                      >
                        Location
                      </li>
                    </ul>
                  </div>
                  {/* Right side filter details */}
                  <div className="w-2/3 px-1 py-3">
                    {renderFilterDetails()}
                  </div>
                </div>
                {/* Clear all filters */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="text-red-500 text-sm underline hover:text-red-600"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className=" bg-[#000] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#000000e0] focus:outline-none"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className=" absolute top-[50%] left-[50%] translate-x-[50%] translate-y-[50%]">
        {filteredJobs.length === 0 ? (
          <p className="text-black text-2xl">No jobs available</p>
        ) : (
          <ul>
            {/* {filteredJobs.map((job) => (
              <li key={job.id} className="p-4 border-b">
                
              </li>
            ))} */}
          </ul>
        ) }
      </div>
          <div className="flex items-center border rounded-full">
            <input
              type="text"
              name="jobTitle"
              value={searchParams.jobTitle}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Search jobs..."
              className="p-2 px-3 w-[25vw] bg-transparent rounded-lg focus:outline-none"
            />
            {/* <div className="w-auto border ml-10 flex items-center rounded-full"> */}
            <button
              onClick={handleSearch}
              className="bg-[#000] text-white p-2 mr-1 rounded-full focus:outline-none focus:bg-[#000000ea]"
            >
              <RiSearch2Line className="hover:scale-110 ease-linear duration-300" />
            </button>
            {/* </div> */}
          </div>
          <div className='w-[55vw] overflow-hidden py-2 rounded-full px-1 border'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`whitespace-nowrap ${isHovered ? '' : 'animate-marquee'}`}>
              <span className="text-black font-semibold text-md">Unlock premium features! Upgrade your package now for unlimited access and exclusive benefits. Don't miss out on enhanced services—click here to upgrade today!</span>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button className="button relative px-3 py-2 text-[#E0B934] border-2 border-[#E0B934] rounded-full bg-transparent font-semibold transition-all duration-300 ease-in-out overflow-hidden">
              <Link to='/PaymentComponent'>Premium</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-grow mt-1 ">
        {/* Job Listings */}
        <div className=" w-1/3 p-2 h-[80vh] bg-white overflow-y-auto ">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              onClick={() => handleJobClick(job)}
              className="group cursor-pointer capitalize  bg-white shadow-sm flex items-center gap-2 rounded-md p-2 mb-1 transition-colors duration-200">
              <div className="h-[4rem] w-[4rem] -mt-10 bg-red-800 rounded-md overflow-hidden">
                <img className="h-full w-full " src={`http://localhost:5000/${job.companyLogo}`} alt="Logo" />
              </div>
              <div className="flex flex-col gap-2 tracking-tight leading-tight">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-300">
                  {job.jobTitle}
                </h2>
                <p className="text-gray-600">{job.companyName}</p>
                <p className="text-gray-600 flex items-center gap-1"><CiLocationOn />{job.location}</p>
                <span className="text-slate-500 flex items-center gap-1"><RiHandbagLine />{job.experience}</span>
              </div>
            </div>
          ))
          }
        </div>
        {/* Job Details */}
        <div className="w-full p-2 h-[80vh] bg-white overflow-y-auto scrollbar-hide ">
          {selectedJob && (
            <div className="bg-white  rounded-lg p-1 group">
              <div className="mb-2 w-full rounded-md bg-white shadow-sm px-2 py-2">
                <div className="flex gap-2 mb-1">
                  <div className="h-[7rem] w-[7rem] rounded-md overflow-hidden">
                    <img className="h-full w-full " src={`http://localhost:5000/${selectedJob.companyLogo}`} alt="Logo" />
                  </div>
                  <div className="w-full">
                    <h2 className="text-2xl font-bold group-hover:text-blue-300 ">{selectedJob.jobTitle}</h2>
                    <p className="text-gray-600">{selectedJob.companyName}</p>
                    <div className="flex items-center justify-end pr-5">
                      {/* <button
                        id="apply_btn"
                        onClick={() => handleApplyClick(selectedJob)}
                        disabled={isApplying || hasUserApplied(selectedJob)}
                        className={`w-[150px] h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md 
    ${hasUserApplied(selectedJob) ? 'bg-red-700 text-white cursor-not-allowed' : 'bg-blue-600 text-[#fff]'}
    ${hasUserApplied(selectedJob) ? 'before:bg-red-600 hover:before:left-0' : 'before:bg-blue-500 hover:before:left-0'}
    hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl`}
                      >
                        {hasUserApplied(selectedJob) ? 'Already Applied' : 'Apply Now'}
                      </button> */}
{selectedJob.userApplicationIds.includes(userId) ? (
  <h2 className="text-white p-3 bg-red-500 rounded-2xl" >Already Applied</h2>
) : (
  userApplyJob.length ===0 || userApplyJob.length < userApplyJob[0].userId.jobLimit ? (
    <button className="text-white px-8 py-2 bg-blue-600 rounded-xl" onClick={() => handleApplyClick(selectedJob)}>Apply</button>
  ) : (
    <button className="text-white px-8 py-2 bg-orange-600 rounded-xl" >Upgrade Limit</button>
  )
)}
                      





                    </div>
                     {/* <ul>
                      {jobs.map((job) => (
                        <li key={job.id}>
                          <div>
                            <div className="flex items-center justify-end pr-5">
                              <button
                                id="apply_btn"
                                onClick={() => handleApplyClick(job)} // Use handleApplyClick with the job passed as argument
                                disabled={
                                  isApplying ||
                                  jobLimit <= 0 ||
                                  job.userApplicationIds.includes(
                                    localStorage.getItem("userId")
                                  )
                                }
                                className={`w-[150px] h-[50px] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md 
              ${
                jobLimit <= 0
                  ? "bg-red-700 text-white cursor-not-allowed"
                  : "bg-blue-600 text-[#fff]"
              }
              ${
                job.userApplicationIds.includes(localStorage.getItem("userId"))
                  ? "before:bg-red-600 hover:before:left-0"
                  : "before:bg-blue-500 hover:before:left-0"
              }
              hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl`}
                              >
                                {job.userApplicationIds.includes(
                                  localStorage.getItem("userId")
                                )
                                  ? "Already Applied"
                                  : jobLimit <= 0
                                  ? "Subscribe to Apply"
                                  : "Apply Now"}
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul> */}
                    <ApplyMsg open={openDialog} onClose={() => setOpenDialog(false)} message={dialogMessage} />
                  </div>
                </div>

                <p className="text-gray-600 flex items-center gap-1"><CiLocationOn />{selectedJob.location}</p>
                <strong className="text-gray-700 ">Updated On:</strong> {selectedJob.updatedOn}
              </div>
              <div className="mb-2 w-full rounded-md bg-white shadow-sm p-3">
                <h1 className="text-gray-700 text-[1.3rem]">Eligibility :</h1>
                <span className="text-xl text-slate-500">{selectedJob.eligibility}</span>
              </div>
              <div className="mb-2 w-full rounded-md bg-white shadow-sm p-2">
                <h1>Job Description :</h1>
                <p>{selectedJob.jobDescription}</p>
                <h1>Desired Skills:</h1>
                <ul className="px-4">
                  {selectedJob.desiredSkills.map((skills) => {
                        return (
                          <li className="list-disc" key={skills}>{skills}</li>
                        )
                      })}
                </ul>
              </div>
              <div className="mb-2 w-full rounded-md bg-white shadow-sm p-2">
                <h1 className="text-gray-700">Application Deadline:</h1>
                <span>{selectedJob.applicationDeadline}</span>
              </div>
              <div className="mb-2 w-full rounded-md bg-white shadow-sm p-2">
                <h1 className="mb-1">Additions Infomations:</h1>
                <div className=' overflow-hidden w-full h-[8rem] border flex items-center justify-between rounded-md px-5 mb-2'>
                  <div>
                    <h1 className="mb-3">Job Location:</h1>
                    <p className="text-gray-600 flex items-center gap-1">
                      <CiLocationOn />{selectedJob.location}
                    </p>
                    <p>{selectedJob.userApplicationIds}</p>
                  </div>
                  <img className="h-[8rem] image -mr-12" src="https://i.pinimg.com/564x/45/e6/f1/45e6f1e0ac33c3d93727f1777ea25bfa.jpg" alt="" />
                </div>

                <div className="w-full border flex items-center justify-between rounded-md px-5 mb-2">
                  <div>
                    <h1 className="mb-3">Experience:</h1>
                    <span className="text-slate-500 flex items-center gap-1"><RiHandbagLine />{selectedJob.experience}</span>
                  </div>
                  <img className="h-[8rem] -mr-12" src="https://i.pinimg.com/564x/43/f3/0b/43f30b54fa2c4ac6972c590e94252d20.jpg" alt="" />
                </div>
                <div className="w-full border flex items-center justify-between rounded-md px-5 mb-2">
                  <div>
                    <h1 className="mb-3" >Salary:</h1>
                    <div>
                      <p>MinSalary: {selectedJob.salary.currency} {selectedJob.salary.minSalary}/{selectedJob.salary.per}</p>
                      <p>MaxSalary: {selectedJob.salary.currency} {selectedJob.salary.maxSalary}/{selectedJob.salary.per}</p>
                    </div>
                  </div>
                  <img className="h-[8rem] -mr-12" src="https://i.pinimg.com/564x/19/95/a1/1995a129278ea92ba000ead577705bf6.jpg" alt="" />
                </div>
                <div className="w-full border flex items-center justify-between rounded-md px-5 mb-2">
                  <div>
                    <h1 className="mb-3">Work Details:</h1>
                    <p>Working days: {selectedJob.workingDays}</p>
                  </div>
                  <img className="h-[8rem] -mr-12" src="https://i.pinimg.com/564x/f1/8c/f3/f18cf327d44a008e48fc5fa064aa228f.jpg" alt="" />
                </div>
                <div className="w-full border flex items-center justify-between rounded-md px-5 mb-2">
                  <div>
                    <h1 className="mb-3" >Job Type/Timing</h1>
                    <p>Job Type: {selectedJob.jobType}</p>
                    <p>Job Timing: {selectedJob.jobTiming}</p>
                  </div>
                  <img className="h-[8rem] -mr-12" src="https://i.pinimg.com/564x/84/8d/f2/848df2907c315b3f5e1e7945afffd428.jpg" alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
