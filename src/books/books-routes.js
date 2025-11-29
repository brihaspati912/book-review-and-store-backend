const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Book = require("./BookModel")

//get=when get back data from backend to frontend
//put/patch =
//delete=t o delete data//


//post= when submit data from frontend to backend
router.post("/create-book", async (req, res) => {
    /**  console.log("body received", req.body);
      console.log(req.method, req.body);
  
      res.json({
          message: "Book received",
          data: req.body
      });
      */

    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book posted successfully", book: newBook })
    } catch (error) {
        console.error("Error posting Book", error);
        res.status(500).send({ message: "Book posted unsuccessful" })
    }
})

module.exports = router;