import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSearch2Line } from "react-icons/ri";
import CustomizedDialogs from "../layouts/CustomizedDialogs";
import { CiLocationOn } from "react-icons/ci";
import { RiHandbagLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
// import ApplyMsg from "./ApplyMsg";
import { ApplicationStatusContext } from "../ApplicationStatusContext";
import { GrDocumentUser } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { Button, Menu, MenuItem } from "@mui/material";

const List = () => {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  // const [noJobsFound, setNoJobsFound] = useState(false);
  const [searchParams, setSearchParams] = useState({
    jobTitle: "",
    location: "",
  });

  const { setApplicationStatus } = useContext(ApplicationStatusContext);
  const filtersRef = useRef(null);
  const sortRef = useRef(null);
  const categoryRef = useRef(null);
  const [selectedJobUsers, setSelectedJobUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);

        const allJobs = response.data;

        // Get the stored company name from localStorage
        const storedCompanyName = localStorage.getItem("companyName");

        // Filter jobs that match the stored company name
        const filteredJobs = allJobs.filter(
          (job) => job.companyName === storedCompanyName
        );

        setJobs(filteredJobs); // Set the filtered jobs

        // Now fetch user details based on userApplicationIds
        const userIds = filteredJobs.flatMap((job) => job.userApplicationIds); // Flatten the array of IDs
        const uniqueUserIds = [...new Set(userIds)]; // Get unique user IDs

        if (uniqueUserIds.length > 0) {
          const usersResponse = await axios.get(
            `http://localhost:5000/api/users?ids=${uniqueUserIds.join(",")}`
          );
          setUsers(usersResponse.data); // Assuming this returns an array of user objects
          console.log("user id data", usersResponse.data);
        }
        setFilteredJobs(filteredJobs);
        console.log("API Response:", filteredJobs); // Log the full response
      } catch (error) {
        console.error("There was an error fetching the jobs!", error);
      }
    };
    fetchJobs();

    const handleClickOutside = (event) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target) &&
        sortRef.current &&
        !sortRef.current.contains(event.target) &&
        categoryRef.current &&
        !categoryRef.current.contains(event.target)
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (filteredJobs.length > 0) {
  //     setSelectedJob(filteredJobs[0]);
  //     setNoJobsFound(false);
  //   } else {
  //     setSelectedJob(null);
  //     setNoJobsFound(true);
  //   }
  // }, [filteredJobs]);

  const handleSearch = () => {
    const filtered = jobs.filter(
      (job) =>
        job.jobTitle
          .toLowerCase()
          .includes(searchParams.jobTitle.toLowerCase()) &&
        job.location
          .toLowerCase()
          .includes(searchParams.location.toLowerCase()) &&
        (selectedTypes.length === 0 || selectedTypes.includes(job.type))
    );
    setFilteredJobs(filtered);
  };

  // Automatically filter when filter criteria change
  useEffect(() => {
    handleSearch();
  }, [searchParams, selectedTypes]); // Trigger when searchParams or selectedTypes change

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type];

      const filtered = jobs.filter(
        (job) =>
          job.jobTitle
            .toLowerCase()
            .includes(searchParams.jobTitle.toLowerCase()) &&
          job.location
            .toLowerCase()
            .includes(searchParams.location.toLowerCase()) &&
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
  // const [isHovered, setIsHovered] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Type");
  const [selectedType, setSelectedType] = useState("");
  const [selectedEligibility, setSelectedEligibility] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSortBy, setSeletedSortBy] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [afterFilteredJobs, setAfterFilteredJobs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const renderFilterDetails = () => {
    switch (activeFilter) {
      case "Type":
        const uniqueJobTypes = [...new Set(jobs.map((job) => job.jobType))];
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Type
              <button
                onClick={() => clearFilter("Type")}
                className="text-red-500 text-sm"
              >
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
      case "Eligibility":
        // Create two options: "Fresher" and "Experience"
        const eligibilityOptions = [
          { label: "Fresher", value: "Fresher" },
          { label: "Experience", value: "Experience" },
        ];

        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Eligibility
              <button
                onClick={() => clearFilter("Eligibility")}
                className="text-red-500 text-sm"
              >
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
      case "Category":
        // Extract unique categories from the jobs data, filtering out undefined values
        const uniqueCategories = [
          ...new Set(jobs.map((job) => job.jobTitle).filter(Boolean)),
        ];
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Category
              <button
                onClick={() => clearFilter("Category")}
                className="text-red-500 text-sm"
              >
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
                .filter(
                  (category) =>
                    category && category.toLowerCase().includes(categorySearch)
                )
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
      case "SortBy":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Sort By
              <button
                onClick={() => clearFilter("SortBy")}
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
      case "Location":
        const uniqueLocation = [...new Set(jobs.map((job) => job.location))];
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-between">
              Location
              <button
                onClick={() => clearFilter("Location")}
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
      case "Type":
        setSelectedType("");
        break;
      case "Eligibility":
        setSelectedEligibility("");
        break;
      case "Category":
        setSelectedCategory("");
        break;
      case "SortBy":
        setSeletedSortBy("");
        break;
      case "Location":
        setSelectedLocations([]);
        setSearchLocation("");
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedType("");
    setSelectedEligibility("");
    setSelectedCategory("");
    setSeletedSortBy("");
    setSelectedLocations([]);
    setSearchLocation("");
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
      filtered = filtered.filter((job) => job.jobType === selectedType);
    }

    // Apply Eligibility filter
    if (selectedEligibility) {
      filtered = filtered.filter(
        (job) => job.eligibility === selectedEligibility
      );
    }

    // Apply Category filter
    if (selectedCategory) {
      filtered = filtered.filter((job) =>
        selectedCategory.includes(job.jobTitle)
      );
    }

    // Apply Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((job) =>
        selectedLocations.includes(job.location)
      );
    }

    // Apply Sort By filter (example: most recent)
    if (selectedSortBy === "mostRecent") {
      filtered = filtered.sort(
        (a, b) => new Date(b.updatedOn) - new Date(a.updatedOn)
      );
    }

    // Update the displayed jobs
    setAfterFilteredJobs(filtered);
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
      const sortedJobs = [...jobs].sort(
        (a, b) => new Date(b.updatedOn) - new Date(a.updatedOn)
      );
    }
  };

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([]);
  // Fetch applications when the component mounts
  // useEffect(() => {
  const fetchApplications = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:5000/api/applications");
      const data = await response.json();
      // console.log("getting application data", data);
      setApplications(data); // Set the fetched applications data
      // console.log(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);

    // Filter users based on the selected job's userApplicationIds and accepted status
    const relatedUsers = users.filter((user) => {
      // Find the application related to this user and job
      const application = applications.find(
        (app) => app.userId._id === user._id && app.jobId._id === job._id
      );
      //console.log("Found application for user:", application);
      //console.log("selectedapplication data", application.statusByCompany);
      // Check if the application exists and its status is 'accepted'
      //alert(application?.hrUpdated.round[application?.hrUpdated.round.length-1])
      return (
        job.userApplicationIds.includes(user._id) &&
        application?.status === "Accepted" &&
        application?.hrUpdated.round[
          application?.hrUpdated.round.length - 1
        ] !== "Hired" &&
        application?.hrUpdated.round[
          application?.hrUpdated.round.length - 1
        ] !== "Rejected"
      );
    });

    //console.log("Filtered related users:", relatedUsers , applications);
    setSelectedJobUsers(relatedUsers, applications);
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    console.log("Selected Application:", user);
    setSelectedApplication(user);
  };

  const [remark, setRemark] = useState("");
  const handleStatusChange = (newStatus, user) => {
    if (!selectedApplication || !selectedApplication._id) {
      console.error("No selected application or missing _id");
      return;
    }
    const id = selectedApplication._id;
    const jobId = selectedJob._id;
    let remark1 = remark;

    if (
      newStatus === "Accepted" &&
      (remark.length <= 4 || remark.startsWith(" "))
    ) {
      alert(
        '"Remark must be longer than 4 character and not start with empty !!!!"'
      );
      return;
    } else if (newStatus === "Rejected") {
      remark1 = "Rejected";
    } else if (newStatus === "Hired") {
      remark1 = "Hired";
    }
    // alert(remark1);
    axios
      .put(`http://localhost:5000/api/applications/statusByCompany/${id}`, {
        statusByCompany: newStatus,
        jobId: jobId,
        remark: remark1,
      })
      
      .then((response) => {
        const updatedApplication = response.data; // Get the updated application from the response
        console.log("Updated Application:", updatedApplication);
        setAnchorEl(null); // Close the menu
      })

      .catch((error) => {
        console.error("Error updating application status:", error);
      });
      setTimeout(() => {
        fetchApplications();
    }, 500); 
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!selectedJob || !selectedJob._id) return; // Check for valid selectedJob
    const jobId = selectedJob._id;

    const fetchChatMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/jobs/${jobId}/chat`
        );
        const updatedChat = await response.json();
        setChatMessages(updatedChat);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchChatMessages(); // Initial fetch

    // Setup SSE
    const eventSource = new EventSource(
      `http://localhost:5000/jobs/${jobId}/chat/stream`
    );

    eventSource.onmessage = (event) => {
      const newChatMessage = JSON.parse(event.data);
      setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
    };

    return () => {
      eventSource.close(); // Cleanup on unmount
    };
  }, [selectedJob]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const chatMessage = { user: "cm", message: newMessage };
      const jobId = selectedJob._id;

      try {
        // Send the message to the server
        const response = await fetch(
          `http://localhost:5000/jobs/${jobId}/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(chatMessage),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        // Immediately update local chat state
        //  setChatMessages((prevMessages) => [...prevMessages, chatMessage]);
        setNewMessage("");
        // No need to fetch updated messages again since we're using SSE
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const navigate = useNavigate();
  const handleViewResume = (resumeId) => {
    // navigate(`/Cv/${resumeId}`);
    // http://localhost:5173/#/Cv/67039eaeae86f646fbe191b2
    window.open(`/#/Cv/${resumeId}`, "_blank");
  };

  const preStyle = {
    // minWidth: "40%", // Limit maximum width
    // width: "auto",
    // padding: "0.5rem 1rem", // Corresponds to px-3 py-1
    // borderRadius: "1.5rem", // Adjust for your rounded classes
    overflow: "auto",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word", // Ensures long words break to the next line
  };

  // FILTER ENDS
  return (
    <div className="w-full bg-white">
      {/* Centered Container for Search Bar and Buttons */}
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-left px-2 w-full gap-2 my-2">
          {/* <FilterComponent/> */}
          <div className="relative ">
            {/* Filter button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-[#000] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#000000e0] focus:outline-none"
            >
              Filters
            </button>
            {/* Filter options - conditional rendering */}
            {isOpen && (
              <div className="absolute top-12 left-0 w-[30vw] rounded-lg bg-black text-white shadow-lg p-3 z-50">
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
                        className={`cursor-pointer rounded-lg hover:bg-[#f8f8f865] p-2 ${
                          activeFilter === "Type" ? "font-bold" : ""
                        } ${activeFilter === "Type" ? "bg-[#3d3838]" : ""}`}
                        onClick={() => setActiveFilter("Type")}
                      >
                        Type
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${
                          activeFilter === "Eligibility" ? "font-bold" : ""
                        } ${
                          activeFilter === "Eligibility" ? "bg-[#3d3838]" : ""
                        }`}
                        onClick={() => setActiveFilter("Eligibility")}
                      >
                        Eligibility
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${
                          activeFilter === "Category" ? "font-bold" : ""
                        } ${activeFilter === "Category" ? "bg-[#3d3838]" : ""}`}
                        onClick={() => setActiveFilter("Category")}
                      >
                        Category
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${
                          activeFilter === "SortBy" ? "font-bold" : ""
                        } ${activeFilter === "SortBy" ? "bg-[#3d3838]" : ""}`}
                        onClick={() => setActiveFilter("SortBy")}
                      >
                        Sort By
                      </li>
                      <li
                        className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${
                          activeFilter === "Location" ? "font-bold" : ""
                        } ${activeFilter === "Location" ? "bg-[#3d3838]" : ""}`}
                        onClick={() => setActiveFilter("Location")}
                      >
                        Location
                      </li>
                    </ul>
                  </div>
                  {/* Right side filter details */}
                  <div className="w-2/3 px-1 py-3">{renderFilterDetails()}</div>
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
          <div className="flex items-center border rounded-full">
            <input
              type="text"
              name="jobTitle"
              value={searchParams.jobTitle}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Search jobs..."
              className="p-2 px-3 w-[25vw] bg-transparent text-black rounded-lg focus:outline-none"
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
        </div>
      </div>
      <div className="w-full flex flex-grow mt-1 bg-slate-100 ">
        {/* Job Listings */}
        <div className=" w-1/5 p-2 h-[80vh] overflow-y-auto">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              onClick={() => handleJobClick(job)}
              className="group cursor-pointer capitalize  bg-white shadow-sm flex items-center gap-2 rounded-md p-2 mb-1 transition-colors duration-200"
            >
              <div className="h-[3rem] w-[3rem] bg-red-800 rounded-md overflow-hidden">
                <img
                  className="h-full w-full "
                  src={`http://localhost:5000/${job.companyLogo}`}
                  alt="Logo"
                />
              </div>
              <div className="flex flex-col gap-2 tracking-tight leading-tight">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-300">
                  {job.jobTitle}
                </h2>
                <p className="text-gray-600">{job.companyName}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Job Details */}
        <div className="w-full p-2 h-[80vh] relative  ">
          {selectedJob ? (
            <div className=" h-full w-full bg-white rounded-lg p-1 group flex gap-3">
              <div className=" w-full rounded-md shadow-sm px-2 py-2 overflow-y-auto scrollbar-hide">
                <div className="flex gap-2 mb-1">
                  <div className="h-[4rem] w-[4rem] rounded-md overflow-hidden">
                    <img
                      className="h-full w-full"
                      src={`http://localhost:5000/${selectedJob.companyLogo}`}
                      alt="Logo"
                    />
                  </div>
                  <div className="w-full">
                    <h2 className="text-2xl text-black font-bold group-hover:text-blue-300 ">
                      {selectedJob.jobTitle}
                    </h2>
                    <p className="text-gray-600">{selectedJob.companyName}</p>
                    <div className="flex items-center justify-end pr-5"></div>
                  </div>
                </div>
                <p className="text-gray-600 flex items-center gap-1">
                  <CiLocationOn />
                  {selectedJob.location}
                </p>
                <strong className="text-gray-700">
                  Updated On: <span> {selectedJob.updatedOn}</span>
                </strong>
                <div className="text-black">
                  <p>Job Type: {selectedJob.jobType}</p>
                  <p>Job Time: {selectedJob.jobTiming}</p>
                  <p>Working Days: {selectedJob.workingDays}</p>
                  <p>Job Description: {selectedJob.jobDescription}</p>
                  <p>Job Type: {selectedJob.jobType}</p>
                  <p>salary: {selectedJob.salary.minSalary}</p>
                  <p>salary: {selectedJob.salary.maxSalary}</p>
                  <p>salary: {selectedJob.salary.currency}</p>
                  <p>salary: {selectedJob.salary.per}</p>
                  <p>Skills: {selectedJob.desiredSkills}</p>
                </div>
                <div className="overflow-x-auto text-black">
                  <div className="flex items-center justify-between gap-1 px-3 py-1 ">
                    <h3 className="text-lg font-bold">Applicant lists:</h3>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={remark}
                        required
                        onChange={(e) => setRemark(e.target.value)}
                        className="py-1 px-2 border"
                        placeholder="write a remark like 1st Round"
                      />
                      <AiFillEdit className="text-xl" />
                    </div>
                  </div>
                  <table className="border-collapse border w-full capitalize whitespace-nowrap border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-2 py-1">
                          Profile
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Full Name
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Resume
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          {/* <input
                            type="text"
                            value={remark}
                            required
                            onChange={(e) => setRemark(e.target.value)}
                            className=" w-full py-1 px-1"
                            placeholder="write a remake like 1st Round "
                          
                          /> */}
                          Interview Rounds
                        </th>
                        <th className="border border-gray-300 px-2 py-1">
                          Action
                        </th>
                        {/* <th className="border border-gray-300 px-2 py-1">
                          Status
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedJobUsers.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td className="border border-gray-300 px-2 py-1">
                              {user.imageUrl && (
                                <img
                                  src={user.imageUrl}
                                  alt={`${user.fullname}'s profile`}
                                  className="h-10 w-10 rounded-full"
                                />
                              )}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              {user.fullname}
                            </td>
                            <td
                              onClick={() => handleViewResume(user.resumeId)}
                              className="border cursor-pointer border-gray-300 text-red-600 px-2 py-1"
                            >
                              <GrDocumentUser />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              {(() => {
                                const userId = user._id;

                                const application = applications.find(
                                  (app) =>
                                    app.userId._id === userId &&
                                    app.jobId._id === selectedJob._id
                                );

                                console.log(
                                  "Current application data:",
                                  application
                                ); // Log the found application

                                if (
                                  application &&
                                  application.companyUpdated &&
                                  application.companyUpdated.length > 0
                                ) {
                                  return (
                                    <ul>
                                      {application.companyUpdated.map(
                                        (remark, index) => (
                                          <li key={`${remark}-${index}`}>
                                            {remark}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  );
                                }

                                return null; // No application or remarks found
                              })()}
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <Button
                                onClick={(event) =>
                                  handleMenuClick(event, user)
                                }
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                              >
                                Actions
                              </Button>
                              <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleMenuClose}
                              >
                                <MenuItem
                                  onClick={() =>
                                    handleStatusChange("Accepted", user)
                                  }
                                >
                                  Take Interview
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleStatusChange("Rejected", user)
                                  }
                                >
                                  Reject
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleStatusChange("Hired", user)
                                  }
                                >
                                  Hired
                                </MenuItem>
                              </Menu>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className=" h-full w-full flex items-center justify-center uppercase">
              <p className="text-black font-semibold">
                select a job to see the details
              </p>
            </div>
          )}
          {/* //chat box starts */}
          <div className="absolute">
            <button
              className="bg-blue-600 fixed bottom-12 right-4 text-white px-3 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
              onClick={() => setIsChatOpen(!isChatOpen)} // Toggle chat box visibility
            >
              {isChatOpen ? "Close Chat" : "Chat with HR"}
            </button>
            {isChatOpen && (
              <div className="fixed bottom-10 right-4 w-[25vw] min-w-[350px] bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden mt-4">
                <div className="bg-blue-600 text-white py-3 px-4 flex justify-between items-center">
                  <h1 className="text-lg font-semibold">
                    {" "}
                    Chat with HR {selectedJob ? selectedJob.hrName : null}
                  </h1>
                  <button
                    className="text-white hover:text-gray-200"
                    onClick={() => setIsChatOpen(false)}
                  >
                    &#x2715;
                  </button>
                </div>
                <div className="h-[50vh] bg-gray-100  py-2 overflow-y-scroll">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.user === "cm" ? "justify-end" : "justify-start"
                      } mb-3`}
                    >
                      <div
                        style={preStyle}
                        className={`max-w-[70%] px-4 py-2 text-sm shadow-sm ${
                          msg.user === "cm"
                            ? "bg-blue-100 text-black rounded-l-2xl"
                            : "bg-blue-600 text-white rounded-r-2xl"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center border-t border-gray-300 p-3 bg-gray-50">
                  <textarea
                    className="flex-1 bg-white border text-black border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-none"
                    rows="1"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="ml-3 bg-blue-600 text-black px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                    onClick={handleSendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* //chat box ends */}
        </div>
      </div>
    </div>
  );
};

export default List;
