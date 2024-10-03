import React from 'react';
//  import { Navigation, Pagination, Scrollbar, A11y, Autoplay , EffectCoverflow, EffectCards, Zoom} from 'swiper/modules';
//  import { Swiper, SwiperSlide } from 'swiper/react';
//  import 'swiper/swiper-bundle.css';
// import {Link} from 'react-router-dom'
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import 'swiper/css/autoplay';
// import 'swiper/css/effect-coverflow';
// import Image1 from '../assets/dm.webp';
// import Image2 from '../assets/fm.webp';
// import Image3 from '../assets/h&n.webp';
// import Image4 from '../assets/m&a.webp';
// import { IoArrowDownSharp } from "react-icons/io5";
// import { MdCallMade } from "react-icons/md";
// import { gsap } from 'gsap';
// // import ParallaxText from './ParallaxText';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextParallaxContentExample } from './TextParallaxContent';
// import Footer from './Footer';
// import FooterWithSocialLinks from "./Components/Footer";
// // Register ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger)


const Home = () => {

  //   const Card = [
  //      { title : "Business idea", description : "Transform your business with advanced technologies", imageURL : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  //      { title : "Business idea", description : "Transform your business with advanced technologies", imageURL : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  //    { title : "Business idea", description : "Transform your business with advanced technologies", imageURL : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  //    { title : "Business idea", description : "Transform your business with advanced technologies", imageURL : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  //   { title : "Business idea", description : "Transform your business with advanced technologies", imageURL : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
  //   { title : "Business idea", description : "Transform your business with advanced technologies", imageURL : "https://plus.unsplash.com/premium_photo-1678216285963-253d94232eb7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJ1c2luZXNzJTIwaWRlYXxlbnwwfHwwfHx8MA%3D%3D"},
  //   ]

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
       {/* <Swiper
       ref={sliderRef}
      modules={[Navigation, Pagination, Scrollbar, A11y , Autoplay ,]}
      navigation
      autoplay
      loop={true}
      pagination={{ clickable: true }}
      className='w-full h-full'>
      <SwiperSlide ><img className='w-full h-full bg-cover bg-center' src={Image1}/></SwiperSlide>
      <SwiperSlide ><img className='w-full h-full bg-cover bg-center' src={Image2}/></SwiperSlide>
      <SwiperSlide ><img className='w-full h-full bg-cover bg-center' src={Image3}/></SwiperSlide>
      <SwiperSlide ><img className='w-full h-full bg-cover bg-center' src={Image4}/></SwiperSlide>
        </Swiper> */}
        <TextParallaxContentExample/>
      </section>
     {/* <section ref={addToRefs} className=' section business-slider w-full text-white flex flex-col items-center gap-5'>
     <div className=' w-full flex flex-col items-center justify-center'>
     <h2 className='font-medium text-[2rem] max-[600px]:text-lg pt-4 uppercase'>Services</h2>
     <h1 className=' font-light text-2xl max-[600px]:text-base pb-2 pt-2  max-[600px]:text-center max-[600px]:tracking-tighter '>Transform your business with advanced technologies</h1>
     </div>
     <div className='business-slider w-full p-2 max-[600px]:-mt-12'>
      <Swiper 
      className='p-3'
      modules={[EffectCards , Pagination]}
      pagination={{ clickable: true }}
    initialSlide={2}
    speed={500}
    rotate={true}
      effect='Cards'
      loop={true}
      grabCursor={true}
      slidesPerView={3}
      spaceBetween={5}
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 80
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 50
        }
      }}
      >
        {Card.map((item, index) =>{
          return (<SwiperSlide key={index} className="p-2 bg-[#1c1a1a] text-white rounded-lg shadow-inherit transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className='overflow-hidden'><img className="w-full h-40 object-cover hover:scale-110 hover:ease-linear hover:duration-500 rounded-t-lg" alt="CardImage" src={item.imageURL}/></div>
            <div className="p-6">
              <h5 className="text-2xl font-bold">{item.title}</h5>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                    <Link to='/' className="bg-black hover:bg-white hover:scale-110 hover:ease-linear hover:duration-500 hover:text-black text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ">Learn More</Link>
                </div>
            </div>
            </SwiperSlide>
            )
            })}
      </Swiper>
      </div>
      <div className='max-[600px]:-mt-12 max-[600px]:mb-4 mb-4 hover:bg-white hover:scale-110 ease-linear duration-700 hover:text-black inline  border rounded-full px-6 py-2'>
          <Link to='/career' className='flex items-center gap-3'>All businesses <IoArrowDownSharp /></Link>
        </div>
     </section>
     <section ref={addToRefs} className='  project w-full bg-black text-white  px-3 py-4 flex flex-col items-center justify-center gap-4'>
       <h1 className='text-center text-[2rem] font-semibold '>Our Projects</h1>
      <div className='project-slider w-full max-[600px]:-mt-2'>
      <Swiper 
      className='py-4 max-[600px]:p-2 '
      modules={[EffectCoverflow , Pagination]}
      pagination={{ clickable: true }}
      effect='coverflow'
      loop={true}
      grabCursor={true}
      slidesPerView={3}
      spaceBetween={5}
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 80
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 10
        }
      }}
      >
        {Card.map((item, index) =>{
          return (<SwiperSlide key={index} className="p-2 bg-[#ffffffd2] text-black rounded-lg  transform hover:scale-150 transition-transform duration-500 ease-in-out">
           <div className='overflow-hidden w-full h-40'><img className="w-full h-full object-cover hover:scale-110 hover:ease-linear hover:duration-500 rounded-t-lg" alt="CardImage" src={item.imageURL}/></div>
            <div className="p-6">
              <h5 className="text-2xl font-bold">{item.title}</h5>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                    <Link to='/' className="bg-black hover:bg-white hover:scale-110 ease-linear duration-500 hover:text-black text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2  ">Learn More</Link>
                </div>
            </div>
            </SwiperSlide>
            )
            })}
      </Swiper>
      </div>
       <div className='bg-black text-white hover:scale-110 ease-linear duration-700 hover:bg-[#1c1a1a] hover:text-white inline  border rounded-full px-6 py-2'>
          <Link to='/career' className='flex items-center gap-3'>View all projects <IoArrowDownSharp /></Link>
        </div>
     </section>
     <section ref={addToRefs} className='  join-our-team w-full  py-5 bg-black text-white text-xl flex items-center flex-col justify-center gap-4'>
         <h1 className='text-center text-[3rem] max-[600px]:leading-snug max-[600px]:text-[2rem]'>Uncover your future.</h1>
         <h1 className='text-center text-[1rem]'>Realize your potential.</h1>
        <div className='hover:scale-110 ease-linear duration-700 hover:bg-white hover:text-black  border rounded-full px-8 py-2'>
          <Link to='/career' className='flex items-center hover:text-black gap-2' >Explore careers <MdCallMade /></Link>
        </div>
     </section> */}
     {/* <FooterWithSocialLinks/> */}
     {/* <Footer/> */}
  </>
    
  )
}

export default Home;