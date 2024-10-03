// import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { useRef } from 'react';

const AdminProfile = () => {
  const circlesRef = useRef(null); // Reference to the circles container

  // Function to trigger the stagger animation
  const handleStaggerAnimation = () => {
    anime({
      targets: '.circle',
      translateX: anime.stagger(10, { grid: [10, 5], from: 'center', axis: 'x' }),
      translateY: anime.stagger(10, { grid: [10, 5], from: 'center', axis: 'y' }),
      scale: [0.5, 1],
      delay: anime.stagger(100, { grid: [10, 5], from: 'center' }),
      easing: 'easeInOutQuad',
    });
  };

  const circles = Array(50).fill(0);  // Creating 50 circles

  return (
    <div className='h-full w-full'>
      {/* <h1>Hello Admin</h1>
      <h2>How ae you?</h2> */}
      {/* <iframe
        src="https://calendar.google.com/calendar/embed?src=suryanshsaxena808%40gmail.com&ctz=Asia%2FKolkata"
        style={{ border: '0' }}
        width="600"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="Google Calendar"
      ></iframe> */}


<div className=" w-full h-full flex flex-col items-center bg-red-800">
      <div 
      
        className="grid grid-cols-10 gap-2 justify-center items-center" 
        ref={circlesRef}
      >
        {circles.map((_, index) => (
          <div  onClick={handleStaggerAnimation} key={index} className="circle w-10 h-10 bg-[#b4b3b3] rounded-full"></div>
        ))}
      </div>
    </div>


    </div>
  );
};
export default AdminProfile;
