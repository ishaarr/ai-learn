import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  const options = {
    amount: 1000 * 100, // ₹1000 in paise
    currency: "INR",
    receipt: "receipt#1",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "EduVerse Premium",
      description: "Upgrade Plan",
      handler: function (response) {
        console.log(response);
      },
      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#3399cc"
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
