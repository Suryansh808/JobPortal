import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [upiId, setUpiId] = useState('');
    const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get('plan');

    const handlePayment = () => {
        if (paymentMethod === 'upi' && upiId) {
            // Redirect to UPI app
            window.location.href = `upi://pay?pa=${upiId}&pn=MerchantName&am=10&cu=INR&tn=Transaction Note`;
        } else if (paymentMethod === 'card') {
            // Handle card payment processing here
            // After processing redirect to success or confirmation page
            navigate('/PaymentSuccess');
        }
    };

    return (
        <div className={`payment-container ${paymentMethod} bg-slate-400 text-black`}>
            <h1 className="text-2xl font-bold text-center mb-6">Payment for {plan} Plan</h1>

            <div className="payment-methods mb-6">
                <label className="block font-medium text-gray-700 mb-2">Select Payment Method</label>
                <div className="flex space-x-4">
                    <button
                        className={`payment-button ${paymentMethod === 'card' ? 'selected' : 'unselected'}`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        Credit/Debit Card
                    </button>
                    <button
                        className={`payment-button ${paymentMethod === 'upi' ? 'selected' : 'unselected'}`}
                        onClick={() => setPaymentMethod('upi')}
                    >
                        UPI
                    </button>
                </div>
            </div>

            {paymentMethod === 'card' && (
                <div className="card-details space-y-4">
                    <div>
                        <label className="block text-gray-700">Card Number</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <label className="block text-gray-700">Expiry Date</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={cardDetails.expiryDate}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">CVV</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === 'upi' && (
                <div className="upi-details mb-6">
                    <label className="block text-gray-700">UPI ID</label>
                    <input
                        type="text"
                        className="w-full text-black p-2 border border-gray-300 rounded"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                    />
                </div>
            )}

            <button
                className="w-full py-3 mt-4 bg-green-600 text-white font-bold rounded-lg"
                onClick={handlePayment}
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentPage;
    