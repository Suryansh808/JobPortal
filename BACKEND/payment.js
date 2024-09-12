const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const razorpay = new Razorpay({
    key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
    key_secret: 'YOUR_RAZORPAY_KEY_SECRET' // Replace with your Razorpay Key Secret
});

app.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise (multiply by 100)
            currency,
            receipt,
            payment_capture: 1 // Auto capture
        });
        res.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(5002, () => console.log('Server running on port 5002'));
