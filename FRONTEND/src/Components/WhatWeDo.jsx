import React from 'react';
 // Ensure this imports your CSS file with the background animation

const WhatWeDo = () => {
  return (
    <div className="min-h-screen bg-animated text-darkText px-2 py-1">
      <h1 className="text-3xl my-2 flex text-center justify-center ">What We Do</h1>
      <div className="space-y-3">
        <Dropdown label="Overview">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, nobis delectus. Facilis natus nulla earum consequuntur odit sed quasi possimus officia, distinctio, dicta odio, ad consequatur tenetur libero debitis quidem.
          </p>
        </Dropdown>
        <Dropdown label="Industries">
          <ul className="list-disc list-inside">
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
          </ul>
        </Dropdown>
        <Dropdown label="Services">
          <ul className="list-disc list-inside">
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
            <li className="hover:text-blue-400">Lorem ipsum dolor sit amet.</li>
          </ul>
        </Dropdown>
        <Dropdown label="Product and Platform">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iste corrupti explicabo nulla illum perferendis. Id necessitatibus molestias inventore fugiat ex dolor nesciunt, cupiditate asperiores. Expedita saepe excepturi nihil cum!
          </p>
        </Dropdown>
      </div>
    </div>
  );
};

const Dropdown = ({ label, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 py-2 bg-gray-800 rounded-lg"
      >
        {label}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-gray-700 rounded-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default WhatWeDo;
