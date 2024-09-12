// import React, { useState } from 'react';
// // import FilterComponent from './FilterComponent';
// // import JobList from '../pages/JobList';
// import JobList from '../pages/JobList';
// import FilterComponent from './FilterComponent';

// const JobsPage = ({ initialJobs }) => {
//     console.log('Initial Jobs:', initialJobs); // Debugging line
//     const [filteredJobs, setFilteredJobs] = useState(initialJobs);
  
//     // Define the function to handle filter application
//     const handleApplyFilters = (filteredJobsFromFilters) => {
//       console.log('Applying filters, new filtered jobs:', filteredJobsFromFilters); // Debugging line
//       setFilteredJobs(filteredJobsFromFilters);
//     };
//     console.log('handleApplyFilters:', handleApplyFilters); // Debugging line
//     return (
//       <div className="jobs-page">
//         {/* Pass the initial jobs and the function to apply filters to FilterComponent */}
//         <FilterComponent allJobs={initialJobs} onApplyFilters={handleApplyFilters} />
  
//         {/* Pass the filtered jobs to JobList */}
//         <JobList jobs={filteredJobs} />
//       </div>
//     );
//   };
  

// export default JobsPage;
