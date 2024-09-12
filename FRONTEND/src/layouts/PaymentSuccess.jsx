import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[#EBF0F5]">
      <div className="bg-white p-16 rounded-lg shadow-lg text-center">
        <div className="flex justify-center items-center rounded-full h-52 w-52 bg-[#F8FAF5] mx-auto mb-6">
          <span className="text-[#9ABC66] text-[100px] leading-[200px]">✓</span>
        </div>
        <h1 className="text-[#88B04B] font-bold text-4xl mb-2">Success</h1>
        <p className="text-[#404F5E] text-lg">
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
