import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const locations = [
//   {
//     title: 'New York, USA',
//     position: { lat: 40.712776, lng: -74.005974 },
//     address: '123 Fifth Ave, New York, NY 10001',
//     phone: '(212) 555-1234',
//     email: 'nyoffice@example.com',
//   },
//   {
//     title: 'London, UK',
//     position: { lat: 51.507351, lng: -0.127758 },
//     address: '456 Baker St, London, UK W1U 7EU',
//     phone: '(20) 7946 0958',
//     email: 'londonoffice@example.com',
//   },
//   {
//     title: 'Sydney, Australia',
//     position: { lat: -33.868820, lng: 151.209290 },
//     address: '789 George St, Sydney, NSW 2000',
//     phone: '(02) 9261 1234',
//     email: 'sydneyoffice@example.com',
//   },
//   {
//     title: 'Tokyo, Japan',
//     position: { lat: 35.689487, lng: 139.691711 },
//     address: '101 Chiyoda, Tokyo 100-0001',
//     phone: '(03) 1234 5678',
//     email: 'tokyooffice@example.com',
//   },
//   {
//     title: 'Mumbai, India',
//     position: { lat: 19.076090, lng: 72.877426 },
//     address: '202 Nariman Point, Mumbai 400021',
//     phone: '(22) 1234 5678',
//     email: 'mumbaioffice@example.com',
//   },
//   {
//     title: 'Berlin, Germany',
//     position: { lat: 52.520008, lng: 13.404954 },
//     address: '303 Alexanderplatz, Berlin 10178',
//     phone: '(30) 1234 5678',
//     email: 'berlinoffice@example.com',
//   },
// ];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 20.0, // Adjust the center latitude
  lng: 0.0,  // Adjust the center longitude
};

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-animated text-darkText p-4">
      <h1 className="text-3xl mb-4 flex text-center justify-center ">Contact US</h1>
      <div className="space-y-4">
        
        <div className='contect-us-form'>  
  <form className="px7  grid justify-center items-center">
    <div className="grid gap-6" id="form">
      <div className="w-full flex gap-3">
        <input className="capitalize rounded-md shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black" type="text" placeholder="First Name" id="First-Name" name="First-Name" required=""/>
        <input className="p-3 capitalize rounded-md shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="text" placeholder="Last Name" id="Last-Name" name="Last-Name"/>
      </div>
      <div className="grid gap-6 w-full">
        <input className="p-3 shadow-2xl rounded-md  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]" type="Email" placeholder="Email" id="Email" name="email"/>
      </div>
      <div className="flex gap-3">
      <textarea placeholder='Message..' name="" id="" className="p-3 rounded-md glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]" type="password">

      </textarea>
      </div>
      <button className="outline-none rounded-md glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold" type="submit">Submit</button>
    </div>
  </form>
        </div>

        <div className="space-y-4 mb-6 mt-5 ">
          <h2 className="text-2xl font-bold text-center">Our Location</h2>
         <div className='flex items-center justify-around'>
         <div>
            <h3 className="text-3xl font-medium">Head Office</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: headoffice@example.com</p>
          </div>
          <div>
            <h3 className="text-3xl font-medium">Branch Office</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Phone: (987) 654-3210</p>
            <p>Email: branchoffice@example.com</p>
          </div>
         </div>
        </div>

        {/* <div className="space-y-4">
          <h2 className="text-2xl font-bold">Global Presence</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-md">
                <h3 className="text-xl font-medium">{location.title}</h3>
                <p>{location.address}</p>
                <p>Phone: {location.phone}</p>
                <p>Email: {location.email}</p>
              </div>
            ))}
          </div>
        </div> */}

        <div className=" mt-3 w-full h-[30vh]">
          {/* <LoadScript googleMapsApiKey="https://maps.app.goo.gl/pckPLRPTwaEL4nU28">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={2}
            >
              {locations.map((location, index) => (
                <Marker key={index} position={location.position} />
              ))}
            </GoogleMap>
          </LoadScript> */}
          <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.6537362823756!2d77.65306337491643!3d12.865627087440128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6d696e67880f%3A0x5b9a53aa71b83daa!2sKrutanic%20Solutions!5e0!3m2!1sen!2sin!4v1722075393049!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;