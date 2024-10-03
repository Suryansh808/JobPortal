// import { useNavigate } from 'react-router-dom';

// const SubscriptionPage = () => {
//   const navigate = useNavigate();

//   const handleSubscribe = () => {
//     // Placeholder for payment logic, or calling your backend subscription API
//     fetch("/subscribe", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: localStorage.getItem("userId"), jobId }), // Fetch userID from local storage
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           alert("Subscription successful! You can now apply for more jobs.");
//           navigate("/Profile");
//         } else {
//           alert("Subscription failed. Please try again.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error subscribing:", error);
//         alert("An unexpected error occurred. Please try again.");
//       });
//   };

//   return (
//     <div>
//       <h1>Subscribe to Apply for More Jobs</h1>
//       <button onClick={handleSubscribe}>Subscribe Now</button>
//     </div>
//   );
// };

// export default SubscriptionPage;
