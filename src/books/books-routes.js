const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Book = require("./BookModel");
const { verifyAdminToken } = require('../books/orders/middleware/VerifyAdminToken');
const { postABook, getAllBooks, getABook, updateABook, deleteABook } = require('./book.controller');

//get=when get back data from backend to frontend
//put/patch =
//delete=t o delete data//



//frontend => backend server => controller => BookSchema => database => back to frontend.

//post= when submit data from frontend to backend
/* POST http://localhost:5000/api/books/create-book
Content-Type : application/json

{
     "title": "How to Grow Your Online Store",
        "description": "Learn the best strategies to grow your online store in today's competitive market.",
        "author":"raushan",
        "category": "business",
        "trending": true,
        "coverImage": "dracula.jpeg",
        "oldPrice": 29.99,
        "newPrice": 19.99
}*/

//1.Post a book
//router.post("/create-book", postABook)
//if you want to give access to only admin us token
console.log("verifyAdminToken", verifyAdminToken);

router.post("/create-book", verifyAdminToken, postABook)

//2.get all books
router.get("/", getAllBooks)

//3.get a single book
router.get("/:id", getABook)

//4.update a book
router.put("/edit/:id", verifyAdminToken, updateABook)

//5.Delete a book // http://localhost:5000/api/books/delete/692ab2879bdeb728f2ee6fa3

router.delete("/delete/:id", verifyAdminToken, deleteABook)

module.exports = router;