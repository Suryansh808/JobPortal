import React from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
    {
        name: "Basic",
        price: 199,
        currency: "INR",
        billingCycle: "per user, per month",
        benefits: [
            { name: "Limited Features", enabled: true },
            { name: "Basic Security", enabled: true },
            { name: "Standard Support", enabled: true },
            { name: "Access to Core Features", enabled: true },
            { name: "Ad-free Experience", enabled: false },
            { name: "Customization Options", enabled: false }
        ],
        cta: { text: "Pay Now", link: "#" },
        style: {
            bgColor: "bg-gray-700",
            textColor: "text-white",
            buttonBgColor: "bg-blue-600",
            buttonTextColor: "text-gray-50",
            buttonHoverTextColor: "hover:text-gray-900"
        }
    },
    {
        name: "Deluxe",
        price: 299,
        currency: "INR",
        billingCycle: "per user, per month",
        benefits: [
            { name: "Unlimited Features", enabled: true },
            { name: "Enhanced Security", enabled: true },
            { name: "Priority Support", enabled: true },
            { name: "Exclusive Access", enabled: true },
            { name: "Ad-free Experience", enabled: false },
            { name: "Customization Options", enabled: true }
        ],
        cta: { text: "Pay Now", link: "#" },
        style: {
            bgColor: "bg-gray-900",
            textColor: "text-white",
            buttonBgColor: "bg-yellow-600",
            buttonTextColor: "text-gray-50",
            buttonHoverTextColor: "hover:text-gray-900"
        }
    },
    {
        name: "Premium",
        price: 399,
        currency: "INR",
        billingCycle: "per user, per month",
        benefits: [
            { name: "All Deluxe Features", enabled: true },
            { name: "Advanced Security", enabled: true },
            { name: "24/7 Support", enabled: true },
            { name: "Full Access to All Features", enabled: true },
            { name: "Ad-free Experience", enabled: true },
            { name: "Full Customization Options", enabled: true }
        ],
        cta: { text: "Pay Now", link: "#" },
        style: {
            bgColor: "bg-black",
            textColor: "text-white",
            buttonBgColor: "bg-red-600",
            buttonTextColor: "text-gray-50",
            buttonHoverTextColor: "hover:text-gray-900"
        }
    }
];
    
const PaymentComponent = () => {
    const navigate = useNavigate();

    const handlePayment = (plan) => {
        // Redirect to payment page with the selected plan's details
        navigate('/PaymentPage', { state: { plan } });
    };

    return (
        <div className="flex items-center justify-center gap-3 py-3 bg-white text-black">
            {plans.map((plan, index) => (
                <div key={index} className={`max-w-[500px] w-full pt-10 px-10 pb-8 ${plan.style.bgColor} rounded-3xl`}>
                    <div className="text-center mb-6">
                        <h5 className={`text-2xl font-semibold ${plan.style.textColor} mb-3`}>{plan.name}</h5>
                        <span className={`block text-5xl font-bold ${plan.style.textColor} mb-3`}>
                            {plan.currency} {plan.price}
                        </span>
                        <span className={`block text-gray-300 font-medium mb-6`}>
                            {plan.billingCycle}
                        </span>
                    </div>
                    <ul>
                        {plan.benefits.map((benefit, i) => (
                            <li key={i} className="flex mb-4 items-center">
                                <svg
                                    className={`w-6 h-6 fill-current ${benefit.enabled ? 'text-white' : 'text-gray-500'}`}
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"
                                    ></path>
                                </svg>
                                <span className={`ml-2 ${benefit.enabled ? 'text-white' : 'text-gray-500 line-through'}`}>
                                    {benefit.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <button
                        className={`relative group inline-block w-full py-4 px-6 text-center ${plan.style.buttonTextColor} ${plan.style.buttonBgColor} font-semibold rounded-full overflow-hidden transition duration-200`}
                        onClick={() => handlePayment(plan)}
                    >
                        <div
                            className={`absolute top-0 right-full w-full h-full bg-black  transform group-hover:translate-x-full group-hover:scale-102 transition duration-500`}
                        ></div>
                        <span className="relative">Pay Now</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PaymentComponent;
