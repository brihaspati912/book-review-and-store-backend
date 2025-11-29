const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const BookReview = require("./BookReviewModel");

//get=when get back data from backend to frontend
//put/patch =
//delete=to delete data//


//post= when submit data from frontend to backend
router.post("/create-bookreview", async (req, res) => {
    console.log(req.body);
    try {
        const newBookReview = await BookReview({ ...req.body });
        await newBookReview.save();
        res.status(200).send({ message: "Book Review posted successfully", book: newBookReview })
    } catch (error) {
        console.error("Error posting BookReview", error);
        res.status(500).send({ message: "Book posted unsuccessful" })
    }
})

module.exports = router;