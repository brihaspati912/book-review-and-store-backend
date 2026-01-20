const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const cors = require('cors');


//todo //
//to add author in booksmodel

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
    // console.log("Mongo URL:", process.env.MONGO_URL);
    console.log("Mongo URL:", process.env.DATABASE_URL);


    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().then(() => { console.log("Mongodb connected") }).catch(err => console.log(err));


//middleware
app.use(express.json()); //to parse json data
app.use(cors({
    origin: ["http://localhost:5173", "https://books-review-and-store.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.urlencoded({ extended: true }));


//routes
const bookRoutes = require("./src/books/books-routes.js");
app.use("/api/books/", bookRoutes)

const orderRoutes = require("./src/books/orders/order.route.js");
app.use("/api/orders/", orderRoutes)

const bookReviewRoutes = require("./src/reviews/books.review.routes.js");
app.use("/api/book-reviews/", bookReviewRoutes)

//users routes
const userRoutes = require("./src/books/orders/users.route.js");
app.use("/api/users/", userRoutes)


//admin stats routes
const adminStatusRoutes = require("./src/books/orders/middleware/stats/admin.stats.js");
app.use("/api/admin/stats/", adminStatusRoutes)

app.get('/', (req, res) => {
    res.send('Hello Book-store Raushan backend!')
})

/*
app.all('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});*/

app.use((req, res, next) => {
    res.status(404).json({ error: `Cannot find ${req.originalUrl} on this server` });
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port} || click on this link http://localhost:${port}`);
})
