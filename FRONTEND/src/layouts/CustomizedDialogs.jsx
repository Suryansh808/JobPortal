import React, { useState } from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
//import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '70%', // Full width
    height: 'auto', // Adjust height according to content
    maxWidth: 'none', // Remove max-width constraint
    // backdropFilter: 'blur(50px)', // Apply blur effect to dialog
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    // backdropFilter: 'blur(50px)', // Apply blur effect to dialog content
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ open, onClose }) {

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    const orderUrl = "http://localhost:5000/create-order";
    const orderData = {
        amount: 500, // Amount in INR
        currency: "INR",
        receipt: "receipt#1"
    };

    try {
        const { data } = await axios.post(orderUrl, orderData);

        const options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
            amount: data.amount,
            currency: data.currency,
            name: "Your Company Name",
            description: "Upgrade Plan",
            order_id: data.id,
            handler: function (response) {
                alert("Payment Successful!");
                // You can send payment details to the server for verification or store in DB
            },
            prefill: {
                name: "Your Name",
                email: "your.email@example.com",
                contact: "9999999999"
            },
            theme: {
                color: "#3399cc"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (error) {
        console.error("Payment failed", error);
    }
};


  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle className='text-center' sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Upgrade your package
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className=''>
           <div className="flex justify-center items-center py-4">
            <input className="peer/option1 sr-only" id="option-1" type="radio" name="panel" />
            <input className="peer/option2 sr-only" id="option-2" type="radio" name="panel" checked />
            <input className="peer/option3 sr-only" id="option-3" type="radio" name="panel" />
            <main className="grid md:grid-cols-3 min-[400px]:grid-cols-1 gap-4 w-full max-w-xs md:max-w-4xl 
              [&>article]:bg-[#2A2A2A]
              [&>article]:shadow-xl
              [&>article]:rounded-xl
              [&>article]:overflow-hidden
              [&>article]:relative 
              [&>article]:isolate
              [&>article]:transition-all
              [&>article]:duration-300
              [&>article>hgroup]:px-12
              [&>article>hgroup]:py-8
              [&>article>main]:px-12
              [&>article>main]:py-8
              [&>article]:border-2
              [&>article]:border-transparent

              [&_hgroup]:bg-[#393A3A]
              [&_hgroup]:text-center

              [&_hgroup>p]:text-4xl
              sm:[&_hgroup>p]:text-5xl
              [&_hgroup>p]:font-bold
              [&_hgroup>p>span]:font-thin
              [&_hgroup>p>span]:text-base
              [&_h2]:uppercase
              [&_h2]:font-light
              [&_h2]:tracking-wider
              [&_main]:space-y-16

              [&_ul]:space-y-3
              [&_ul]:text-sm
              [&_ul]:text-center 
              [&_ul]:text-[#A3A3A3]

              [&_label]:block
              [&_label]:text-center
              [&_label]:cursor-pointer
              [&_label]:py-2
              [&_label]:px-6
              [&_label]:w-fit
              [&_label]:mx-auto
              [&_label]:rounded-full
              [&_label]:font-light
              [&_label]:uppercase
              [&_label]:relative
              [&_label]:isolate
              [&_label]:text-white
              [&_label]:whitespace-nowrap 
              [&_label]:text-sm
              [&_label]:transition-all
              [&_label]:duration-500
              [&_label]:delay-50
              focus-visible:[&_label]:border-none
              focus-visible:[&_label]:outline-none
              focus-visible:[&_label]:ring-0

              before:[&_label]:absolute
              before:[&_label]:inset-[1px]
              before:[&_label]:rounded-full 
              before:[&_label]:bg-[#1d1f20]
              before:[&_label]:-z-10
              before:[&_label]:transition-all
              before:[&_label]:duration-300
              hover:before:[&_label]:inset-full

              [&_.gradient]:bg-gradient-to-r
              [&_label]:bg-gradient-to-r

              [&_.waves]:absolute     
              [&_.waves]:inset-[-35%_0_0_0]
              [&_.waves]:text-[#1d1f20]
              [&_.waves]:-z-10
              [&_.waves]:rounded-b-xl
              [&_.waves]:overflow-hidden
              [&_.waves]:transition-all
              [&_.waves]:duration-500
              [&_svg]:transition-all
              [&_svg]:duration-300

              [&_#price-1_.gradient]:bg-rose-500
              [&_#price-1_.gradient]:from-red-200
              [&_#price-1_.gradient]:to-red-600
              [&_#price-1_label]:from-red-200
              [&_#price-1_label]:to-red-600
              [&_#price-1]:from-red-200
              [&_#price-1]:to-red-600
              peer-focus/option1:[&_article#price-1_.waves]:inset-[-40%_-20%_0_-40%]
              peer-focus/option1:[&_article#price-1]:border-rose-900
              peer-checked/option1:[&_article#price-1]:border-rose-900
              X-hover:[&_article#price-1]:border-rose-900
              peer-checked/option1:[&_article#price-1_.waves>svg]:bg-rose-900 

              [&_#price-2_.gradient]:bg-cyan-500
              [&_#price-2_.gradient]:from-cyan-200
              [&_#price-2_.gradient]:to-cyan-600
              [&_#price-2_label]:from-cyan-200
              [&_#price-2_label]:to-cyan-600
              [&_#price-2]:from-cyan-200
              [&_#price-2]:to-cyan-600
              peer-focus/option2:[&_article#price-2_.waves]:inset-[-40%_-10%_0_0%]
              peer-focus/option2:[&_article#price-2]:border-cyan-900
              peer-checked/option2:[&_article#price-2]:border-cyan-900
              X-hover:[&_article#price-2]:border-cyan-900
              peer-checked/option2:[&_article#price-2_.waves>svg]:bg-cyan-900

              [&_#price-3_.gradient]:bg-rose-500
              [&_#price-3_.gradient]:from-green-200
              [&_#price-3_.gradient]:to-green-600
              [&_#price-3_label]:from-green-200
              [&_#price-3_label]:to-green-600
              [&_#price-3]:from-green-200
              [&_#price-3]:to-green-600
              peer-focus/option3:[&_article#price-3_.waves]:inset-[-40%_-40%_0_-0%]
              peer-focus/option3:[&_article#price-3]:border-green-900
              peer-checked/option3:[&_article#price-3]:border-green-900
              X-hover:[&_article#price-3]:border-green-900
              peer-checked/option3:[&_article#price-3_.waves>svg]:bg-green-900   
            ">
              <article id="price-1" className="group">
                <hgroup className="gradient">
                  <p>199<span>/mo</span></p>
                  <h2>Premium Package</h2>
                </hgroup>
                <main>
                  <ul role="list">
                    <li>10 Jobs</li>
                    {/* <li>Unlimited traffic</li>
                    <li>Forum access</li>
                    <li>Support at $25/hour</li> */}
                  </ul>
                  <label htmlFor="option-1" className="group/btn">
                    <div onClick={handlePayment}  className="gradient delay-50 group-hover/btn:!from-black group-hover/btn:!to-black">Choose plan</div>
                  </label>
                </main>
                <div className="waves group-hover:inset-[-40%_-20%_0_-40%] ">
                  <svg className="w-full h-full" viewBox="0 0 600 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" overflow="auto" shape-rendering="auto" fill="currentColor">
                    <path id="wavepath" d="M 0 2000 0 500 Q 150 434 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z" />
                  </svg>
                </div>
              </article>

              <article id="price-2" className="group">
                <hgroup className="gradient">
                  <p>4999<span>/mo</span></p>
                  <h2>Gold Package</h2>
                </hgroup>
                <main>
                  <ul>
                    <li></li>
                    <li>Unlimited Jobs</li>
                    {/* <li>Forum access</li>
                    <li>Support at $5/hour</li> */}
                  </ul>
                  <label htmlFor="option-2" className="group/btn">
                    <div className="gradient delay-50 group-hover/btn:!from-black group-hover/btn:!to-black">Choose plan</div>
                  </label>
                </main>
                <div className="waves group-hover:inset-[-40%_-10%_0_0%]">
                  <svg className="w-full h-full" viewBox="0 0 600 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" overflow="auto" shape-rendering="auto" fill="currentColor">
                    <path id="wavepath" d="M 0 2000 0 500 Q 150 434 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z" />
                  </svg>
                </div>
              </article>

              <article id="price-3" className="group">
                <hgroup className="gradient">
                  {/* <p><span>/mo</span></p> */}
                  <h2>Custom package</h2>
                </hgroup>
                <main>
                  <ul>
                    {/* <li>20GB of space</li>
                    <li>Unlimited traffic</li>
                    <li>Forum access</li>
                    <li>Free Support</li> */}
                  </ul>
                  <label htmlFor="option-3" className="group/btn">
                    <div className="gradient delay-50 group-hover/btn:!from-black group-hover/btn:!to-black">Choose plan</div>
                  </label>
                </main>
                <div className="waves group-hover:inset-[-40%_-40%_0_-0%]">
                  <svg className="w-full h-full" viewBox="0 0 600 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" overflow="auto" shape-rendering="auto" fill="currentColor">
                    <path id="wavepath" d="M 0 2000 0 500 Q 150 434 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z" />
                  </svg>
                </div>
              </article>
            </main>
          </div> 
          
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
