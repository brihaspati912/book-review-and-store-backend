const Order = require("./order.model");

const createOrder = async (req, res) => {
    try {

        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json({
            message: "Order created successfully",
            order: savedOrder,
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;

        const orders = await Order
            .find({ email })
            .sort({ createdAt: -1 });

        if (!orders.length) {
            return res.status(404).json({
                message: "No orders found for this email"
            });
        }

        res.status(200).json({ orders });

    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message   // 🔥 temporary for debugging
        });
    }
};

module.exports = {
    createOrder,
    getOrderByEmail
};