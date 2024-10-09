import React from 'react';
import { TextParallaxContentExample } from './TextParallaxContent';

const Home = () => {


  //   const sliderRef = useRef(null);
  //   useEffect(() => {
  //     gsap.fromTo(
  //       sliderRef.current,
  //       { y: 100,
  //         opacity: 0 }, // Start from bottom and transparent
  //       { y: 0, opacity: 1, duration: 1  } // Move to top and fully visible
  //     );
  //   }, []);
   
  //    // Create refs for each section
  // const sectionRef = useRef([]);
  // sectionRef.current = [];

  // // Function to add refs
  // const addToRefs = (el) => {
  //   if (el && !sectionRef.current.includes(el)) {
  //     sectionRef.current.push(el);
  //   }
  // };

  // useEffect(() => {
  //   // Animate each section
  //   sectionRef.current.forEach((el) => {
  //     gsap.fromTo(el, 
  //       { opacity: 0, y: 50 }, 
  //       { 
  //         opacity: 1, 
  //         y: 0, 
  //         duration: 2, 
  //         ease: 'power2.out',
  //         scrollTrigger: {
  //           trigger: el,
  //           start: 'top 80%', // Start animation when the top of the element is 80% from the top of the viewport
  //           end: 'bottom 20%', // End animation when the bottom of the element is 20% from the top of the viewport
  //           toggleActions: 'play reverse play reverse', // Play the animation when entering and reverse it when leaving
  //         },
  //       }
  //     );
  //   });
  // }, []);
 
    
  return (
    <>  
      <section className='w-full h-screen -mt-20 bg-black max-[600px]:h-1/2'>
        <TextParallaxContentExample/>
      </section>
   
  </>
    
  )
}

export default Home;