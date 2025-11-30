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
    console.log("Mongo URL:", process.env.MONGO_URL);


    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().then(() => { console.log("Mongodb connected") }).catch(err => console.log(err));


//middleware
app.use(express.json()); //to parse json data
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));


//routes
const bookRoutes = require("./src/books/books-routes.js");
app.use("/api/books/", bookRoutes)
const bookReviewRoutes = require("./src/reviews/books.review.routes.js");
app.use("/api/book-reviews/", bookReviewRoutes)


app.use('/', (req, res) => {
    res.send('Hello Book-store Raushan backend!')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port} || click on this link http://localhost:${port}`);
})