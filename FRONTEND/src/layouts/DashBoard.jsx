import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import BasicPie from '../Components/BasicPie';
// import BasicBars from '../Components/BasicBar';
import { CgProfile } from "react-icons/cg";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Pie, Bar } from 'react-chartjs-2';
//import bgImage from '../assets/background.jpg'; // Make sure to add your background image in the assets folder

export default function BasicGrid() {
  const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5001/api/StudentData/${id}`)
            .then((res) => res.json())
            .then((data) => setSkills(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    console.log(skills);


    const filteredSkills = skills.filter(skill => skill.level >= 3); // Example condition

    const pieChartData = {
        labels: filteredSkills.map(skill => skill.name),
        datasets: [{
            data: filteredSkills.map(skill => skill.percentage),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }]
    };
    
    const barChartData = {
        labels: filteredSkills.map(skill => skill.name),
        datasets: [{
            label: 'Skill Level',
            data: filteredSkills.map(skill => skill.level),
            backgroundColor: '#36A2EB',
        }]
    };
    
  return (
    <Box sx={{ flexGrow: 1 }} className="relative min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-white opacity-50"></div> {/* Overlay for better text visibility */}
      
      <div className="relative z-10 p-6">
        <Grid container spacing={4} className="max-[600px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
       
          
          {/* Resume Bar Stats */}
          <Grid item xs={12} sm={6} className="border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className=" flex flex-col items-center justify-center bg-gray-800 rounded-lg">
           
            <div className=" w-full flex items-start justify-start"> 
                 <Tooltip title="Profile">
                  <IconButton aria-label="profile" className="text-white">
                    <Link to='/Profile'><CgProfile size={24} /></Link>
                  </IconButton>
                </Tooltip>
              </div>
              <h2 className="text-xl font-semibold mb-4">Resume Bar Stats</h2>
               {/* <BasicBars /> */}
               <Bar data={barChartData} />
            </div>
          </Grid> 
          
          {/* Pie Chart */}
          <Grid item xs={12} sm={6} className="border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 flex flex-col items-center justify-center w-full h-full bg-gray-800 rounded-lg">
             
              <h2 className="text-xl font-semibold mb-4">Pie Chart</h2>
              {/* <BasicPie /> */}
              <Pie data={pieChartData} />
            </div>
          </Grid>
          
          {/* Skills Stats */}
          <Grid item xs={12} sm={6} className="border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4  w-full h-full bg-gray-800 rounded-lg">
              <h1 className="text-2xl font-semibold text-center mb-4">Skills Stats According to Job Profile</h1>
              <ul className="list-disc px-5 text-gray-300">
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
              </ul>
            </div>
          </Grid>
          
          {/* Steps to Follow */}
          <Grid item xs={12} sm={6} className="border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h1 className="text-2xl font-semibold text-center mb-4">Steps to Follow</h1>
              <p className="text-gray-300 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, accusantium harum quas sequi aperiam non expedita. At molestiae voluptate odit nostrum quidem, repellendus, accusamus, quos consequuntur eius exercitationem consequatur. Temporibus.</p>
              <ul className="list-decimal px-5 text-gray-300">
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet.</li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

