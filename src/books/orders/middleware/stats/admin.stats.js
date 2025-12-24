const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Order = require("../../../orders/order.model");
const Book = require("../../../BookModel");
//understand all these codes
//Function to calculate admin stats
async function calculateAdminStats() {
    try {
        // Total Sales
        const totalSalesResult = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalAmount" },
                },
            },
        ]);
        const totalSales = totalSalesResult[0] ? totalSalesResult[0].totalSales : 0;
        // Total Orders
        const totalOrders = await Order.countDocuments();
        // Total Books Sold
        const booksSoldResult = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: null,
                    totalBooksSold: { $sum: "$items.quantity" },
                },
            },
        ]);
        const totalBooksSold = booksSoldResult[0] ? booksSoldResult[0].totalBooksSold : 0;
        // Top Selling Books    
        const topSellingBooks = await Order.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.book",
                    totalQuantity: { $sum: "$items.quantity" },
                },
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 },
        ]);
        const topSellingBookDetails = await Book.find({
            _id: { $in: topSellingBooks.map((b) => b._id) },
        }).select("title author coverImage");
        const topSellingBooksWithDetails = topSellingBooks.map((book) => {
            const details = topSellingBookDetails.find((b) => b._id.equals(book._id));
            return {
                bookId: book._id,
                title: details ? details.title : "Unknown",
                author: details ? details.author : "Unknown",
                coverImage: details ? details.coverImage : "",
                totalQuantity: book.totalQuantity,
            };
        });
        return {
            totalSales,
            totalOrders,
            totalBooksSold,
            topSellingBooks: topSellingBooksWithDetails,
        };
    } catch (error) {
        console.error("Error calculating admin stats:", error);
        throw error;
    }
}
// Admin stats route
router.get("/", async (req, res) => { // admin/stats and this agin call to dashboardlayout js which went /api/admin/stats + admin/stats
    try {
        const stats = await calculateAdminStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin stats" });
    }
});
module.exports = router;