// import React, { useEffect, useState } from 'react';
// import { AiOutlineClose } from "react-icons/ai";
// import axios from 'axios';

// const FilterComponent = ({ allJobs = [], onApplyFilters }) => {
//   const [isOpen, setIsOpen] = useState(false); // Track if filter options are open
//   const [activeFilter, setActiveFilter] = useState('Type'); // Automatically set 'Type' as the first active filter
//   const [selectedType, setSelectedType] = useState('');
//   const [selectedEligibility, setSelectedEligibility] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedSortBy, setSeletedSortBy] = useState('');
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [searchLocation, setSearchLocation] = useState('');
//   const [categorySearch, setCategorySearch] = useState('');

//   // console.log(allJobs);

//   const applyFilters = () => {
     
//     if (!Array.isArray(allJobs)) {
//       console.error('allJobs is not an array');
//       return;
//   }
//     let filteredJobs = allJobs;
//     // let filteredJobs = allJobs;
  
//     // Apply Type filter
//     if (selectedType) {
//       filteredJobs = filteredJobs.filter(job => job.jobType === selectedType);
//     }
  
//     // Apply Eligibility filter
//     if (selectedEligibility) {
//       filteredJobs = filteredJobs.filter(job => job.eligibility === selectedEligibility);
//     }
  
//     // Apply Category filter
//     if (selectedCategory) {
//       filteredJobs = filteredJobs.filter(job => selectedCategory.includes(job.jobTitle));
//     }
  
//     // Apply Location filter
//     if (selectedLocations.length > 0) {
//       filteredJobs = filteredJobs.filter(job => selectedLocations.includes(job.location));
//     }
  
//     // Apply Sort By filter (example: most recent)
//     if (selectedSortBy === 'mostRecent') {
//       filteredJobs = filteredJobs.sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));
//     }
  
//     // Update the displayed jobs
//     // onApplyFilters(filteredJobs);
//     if (typeof onApplyFilters === 'function') {
//       onApplyFilters(filteredJobs);
//       console.log(filteredJobs);
//   } else {
//       console.error('onApplyFilters is not a function');
//   }
//   };
 
//   const clearFilter = (filterType) => {
//     switch (filterType) {
//       case 'Type':
//         setSelectedType('');
//         break;
//       case 'Eligibility':
//         setSelectedEligibility('');
//         break;
//       case 'Category':
//         setSelectedCategory('');
//         break;
//       case 'SortBy':
//         setSeletedSortBy('');
//         break;
//       case 'Location':
//         setSelectedLocations([]);
//         setSearchLocation('');
//         break;
//       default:
//         break;
//     }
//   };

//   const clearAllFilters = () => {
//     setSelectedType('');
//     setSelectedEligibility('');
//     setSelectedCategory('');
//     setSeletedSortBy('');
//     setSelectedLocations([]);
//     setSearchLocation('');
//   };

//   const handleLocationChange = (location) => {
//     setSelectedLocations((prevSelected) =>
//       prevSelected.includes(location)
//         ? prevSelected.filter((loc) => loc !== location)
//         : [...prevSelected, location]
//     );
//   };
//   const handleCategoryChange = (category) => {
//     setSelectedCategory((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//   };

//   // -------------jobs data fetching starts ------------
//   const [jobs, setJobs] = useState([]);
//   useEffect(() => {
//         // Fetch job data from API
//         const fetchJobData = async () => {
//           try {
//             const response = await axios.get('http://localhost:5000/jobs');
//             setJobs(response.data);
//             // console.log(response.data);
//           } catch (error) {
//             console.error('Error fetching job data:', error);
//           }
//         };
//         fetchJobData();
//       }, []);
       
//       const handleSortByChange = (sortBy) => {
//         setSeletedSortBy(sortBy);
      
//         if (sortBy === "mostRecent") {
//           // Sort jobs by the 'updatedOn' date in descending order
//           const sortedJobs = [...jobs].sort((a, b) => new Date(b.updatedOn) - new Date(a.updatedOn));
//         }
//       };
      
//       // Function to clear the sort filter
//       // const clearFilter = (filterName) => {
//       //   if (filterName === 'SortBy') {
//       //     setSeletedSortBy(""); // Reset the selected sort option
//       //     setDisplayedJobs(jobs); // Reset the job list to the original unsorted list
//       //   }
//       // }; 

//   // -------------jobs data fetching ends ------------

//   const renderFilterDetails = () => {
//     switch (activeFilter) {
//       case 'Type':
//         const uniqueJobTypes = [...new Set(jobs.map(job => job.jobType))];
//         return (
//           <div>
//             <h3 className="text-lg font-semibold mb-2 flex justify-between">
//               Type
//               <button
//                 onClick={() => clearFilter('Type')}
//                 className="text-red-500 text-sm">
//                 Clear
//               </button>
//             </h3>
//             <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
//               {uniqueJobTypes.map((type , i) => (
//                 <li key={i}>
//                   <label className="flex items-center space-x-2  cursor-pointer">
//                     <input
//                       type="radio"
//                       name="type"
//                       value={type}
//                       checked={selectedType === type}
//                       onChange={() => setSelectedType(type)}
//                       className="form-radio"
//                     />
//                     <span>{type}</span>
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         );
//         case 'Eligibility':
//           // Create two options: "Fresher" and "Experience"
//           const eligibilityOptions = [
//             { label: "Fresher", value: "Fresher" },
//             { label: "Experience", value: "Experience" }
//           ];
//           // Filter jobs to count how many are "Fresher" or "Experience"
//           const fresherJobs = jobs.filter(job => job.eligibility.toLowerCase() === "fresher");
//           const experienceJobs = jobs.filter(job => job.eligibility.toLowerCase() !== "fresher");
        
//           return (
//             <div>
//               <h3 className="text-lg font-semibold mb-2 flex justify-between">
//                 Eligibility
//                 <button
//                   onClick={() => clearFilter('Eligibility')}
//                   className="text-red-500 text-sm">
//                   Clear
//                 </button>
//               </h3>
//               <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
//                 {eligibilityOptions.map((option, i) => (
//                   <li key={i}>
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="eligibility"
//                         value={option.value}
//                         checked={selectedEligibility === option.value}
//                         onChange={() => setSelectedEligibility(option.value)}
//                         className="form-radio"
//                       />
//                       <span>{option.label}</span>
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           );
//         case 'Category':
//           // Extract unique categories from the jobs data, filtering out undefined values
//           const uniqueCategories = [...new Set(jobs.map(job => job.jobTitle).filter(Boolean))];
//           return (
//             <div>
//               <h3 className="text-lg font-semibold mb-2 flex justify-between">
//                 Category
//                 <button
//                   onClick={() => clearFilter('Category')}
//                   className="text-red-500 text-sm">
//                   Clear
//                 </button>
//               </h3>
//               {/* Search bar */}
//               <input
//                 type="text"
//                 placeholder="Search Category..."
//                 className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
//                 onChange={(e) => setCategorySearch(e.target.value.toLowerCase())}
//               />
//               <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
//                 {uniqueCategories
//                   .filter((category) => category && category.toLowerCase().includes(categorySearch))
//                   .map((category, i) => (
//                     <li key={i}>
//                       <label className="flex items-center space-x-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="category"
//                           value={category}
//                           checked={selectedCategory.includes(category)}
//                           onChange={() => handleCategoryChange(category)}
//                           className="form-checkbox"
//                         />
//                         <span>{category}</span>
//                       </label>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           );
//           case 'SortBy':
//             return (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 flex justify-between">
//                   Sort By
//                   <button
//                     onClick={() => clearFilter('SortBy')}
//                     className="text-red-500 text-sm"
//                   >
//                     Clear
//                   </button>
//                 </h3>
//                 <ul className="space-y-2">
//                   <li>
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         name="sortby"
//                         value="mostRecent"
//                         checked={selectedSortBy === "mostRecent"}
//                         onChange={() => handleSortByChange("mostRecent")}
//                         className="form-checkbox"
//                       />
//                       <span>Most Recent</span>
//                     </label>
//                   </li>
//                 </ul>
//               </div>
//             );
//         case 'Location':
//           const uniqueLocation = [...new Set(jobs.map(job => job.location))];
//           return (
//             <div>
//               <h3 className="text-lg font-semibold mb-2 flex justify-between">
//                 Location
//                 <button
//                   onClick={() => clearFilter('Location')}
//                   className="text-red-500 text-sm"
//                 >
//                   Clear
//                 </button>
//               </h3>
//               <input
//                 type="text"
//                 placeholder="Search Location"
//                 value={searchLocation}
//                 onChange={(e) => setSearchLocation(e.target.value)}
//                 className="w-full p-2 border border-gray-300 rounded-md mb-2"
//               />
//               <ul className="space-y-2 overflow-y-scroll scrollbar-hide h-[22vh]">
//                 {uniqueLocation
//                   .filter((location) =>
//                     location.toLowerCase().includes(searchLocation.toLowerCase())
//                   )
//                   .map((location, i) => (
//                     <li key={i}>
//                       <label className="flex items-center space-x-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="location"
//                           value={location}
//                           checked={selectedLocations.includes(location)}
//                           onChange={() => handleLocationChange(location)}
//                           className="form-checkbox"
//                         />
//                         <span>{location}</span>
//                       </label>
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           );
//       default:
//         return null; // No default message, as the first option will be automatically selected
//     }
//   };
     
//   return (
//     <div className="relative ">
//       {/* Filter button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="bg-[#000] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#000000e0] focus:outline-none">
//         Filters
//       </button>
//       {/* Filter options - conditional rendering */}
//       {isOpen && (
//         <div className="absolute top-12 left-0 w-[30vw]  bg-white  shadow-lg p-3 z-50">
//           {/* Close Icon */}
//           <div className="flex justify-between mb-4">
//             <h2 className="text-lg font-semibold">Filters</h2>
//             <AiOutlineClose 
//               className="w-6 h-6 text-gray-500 hover:bg-slate-100 rounded-full p-1 cursor-pointer"
//               onClick={() => setIsOpen(false)}
//             />
//           </div>
//           <div className="flex space-x-2 border-t">
//             {/* Left side filters */}
//             <div className="w-1/3 py-3 border-r px-1">
//               <ul className="space-y-1">
//                 <li
//                   className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Type' ? 'font-bold' : ''} ${activeFilter === 'Type' ? 'bg-[#E5F1FC]' : ''}`}
//                   onClick={() => setActiveFilter('Type')}
//                 >
//                   Type
//                 </li>
//                 <li
//                   className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Eligibility' ? 'font-bold' : ''} ${activeFilter === 'Eligibility' ? 'bg-[#E5F1FC]' : ''}`}
//                   onClick={() => setActiveFilter('Eligibility')}
//                 >
//                   Eligibility
//                 </li>
//                 <li
//                   className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Category' ? 'font-bold' : ''} ${activeFilter === 'Category' ? 'bg-[#E5F1FC]' : ''}`}
//                   onClick={() => setActiveFilter('Category')}
//                 >
//                   Category
//                 </li>
//                 <li
//                   className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'SortBy' ? 'font-bold' : ''} ${activeFilter === 'SortBy' ? 'bg-[#E5F1FC]' : ''}`}
//                   onClick={() => setActiveFilter('SortBy')}
//                 >
//                   Sort By
//                 </li>
//                 <li
//                   className={`cursor-pointer rounded-lg hover:bg-[#e5f1fc65] p-2 ${activeFilter === 'Location' ? 'font-bold' : ''} ${activeFilter === 'Location' ? 'bg-[#E5F1FC]' : ''}`}
//                   onClick={() => setActiveFilter('Location')}
//                 >
//                   Location
//                 </li>
//               </ul>
//             </div>
//             {/* Right side filter details */}
//             <div className="w-2/3 px-1 py-3">
//               {renderFilterDetails()}           
//             </div>
//           </div>
//           {/* Clear all filters */}
//           <div className="flex items-center justify-end gap-2">
//             <button
//               onClick={clearAllFilters}
//               className="text-red-500 text-sm underline hover:text-red-600"
//             >
//               Clear All Filters
//             </button>
//             <button
//                onClick={applyFilters}
//                 className=" bg-[#000] text-white px-4 py-2 rounded-full shadow-md hover:bg-[#000000e0] focus:outline-none"
//               >
//                 Apply Filter
//               </button>
//           </div>
//         </div>
//       )}   
//     </div>
//   );

// }

// export default FilterComponent;