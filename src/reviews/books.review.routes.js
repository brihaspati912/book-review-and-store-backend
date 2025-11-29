const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const BookReview = require("./BookReviewModel");
const { postAReview, getAllReviews, getABookReview, updateABookReview, deleteABookReview } = require('./book.review.controller');

//get=when get back data from backend to frontend
//put/patch =
//delete=to delete data//


//post= when submit data from frontend to backend
router.post("/create-bookreview", postAReview)

//get all book reviews //http://localhost:5000/api/book-reviews/
router.get("/", getAllReviews)

//get a review
router.get("/:id", getABookReview)

//update a bookreview PUT http://localhost:5000/api/book-reviews/edit/692a7c08694c16ae8af8cfd3
router.put("/edit/:id", updateABookReview)

//Delete a BookReview  //DELETE http://localhost:5000/api/book-reviews/692a7c08694c16ae8af8cfd3
router.delete("/delete/:id", deleteABookReview)

module.exports = router;