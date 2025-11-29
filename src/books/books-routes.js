const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Book = require("./BookModel");
const { postABook, getAllBooks, getABook, updateABook, deleteABook } = require('./book.controller');

//get=when get back data from backend to frontend
//put/patch =
//delete=t o delete data//



//frontend => backend server => controller => BookSchema => database => back to frontend.

//post= when submit data from frontend to backend
router.post("/create-book", postABook)

//get all books
router.get("/", getAllBooks)

//get a single book
router.get("/:id", getABook)

//update a book
router.put("/edit/:id", updateABook)

//Delete a book // http://localhost:5000/api/books/delete/692ab2879bdeb728f2ee6fa3

router.delete("/delete/:id", deleteABook)

module.exports = router;