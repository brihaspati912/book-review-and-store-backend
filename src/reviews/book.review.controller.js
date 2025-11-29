
const BookReview = require("./BookReviewModel");
const postAReview = async (req, res) => {
    console.log(req.body);
    try {
        const newBookReview = await BookReview({ ...req.body });
        await newBookReview.save();
        res.status(200).send({ message: "Book Review posted successfully", bookreview: newBookReview })
    } catch (error) {
        console.error("Error posting BookReview", error);
        res.status(500).send({ message: "BookReviews post unsuccessful" })
    }
}

const getAllReviews = async (req, res) => {
    try {
        const books = await BookReview.find().sort({ createdAt: -1 });
        res.status(200).send(books)
    } catch (error) {
        console.error("Error getting Book", error);
        res.status(500).send({ message: "Books not found " })
    }
}


//get a Review
const getABookReview = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookReview.findById(id).sort({ createdAt: -1 });
        if (!book) {
            res.status(404).send({ message: "BookReview not found " })
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error getting Book", error);
        res.status(500).send({ message: "Failed to fecth book  " })
    }
}


//update a bookReview
const updateABookReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedbookreview = await BookReview.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedbookreview) {
            res.status(404).send({ message: "Book is not found " })
        }
        res.status(200).send({
            message: "Sucessfully updated review",
            book: updatedbookreview
        })
    } catch (error) {
        console.error("Error updating Book review", error);
        res.status(500).send({ message: "Failed to update book-review data " })
    }
}

//Delete A book Review
const deleteABookReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedbookreview = await BookReview.findByIdAndDelete(id);
        if (!deletedbookreview) {
            res.status(404).send({ message: "Book is not found " })
        }
        res.status(200).send({
            message: "Sucessfully deleted review",
            book: deletedbookreview
        })
    } catch (error) {
        console.error("Error delete Book review", error);
        res.status(500).send({ message: "Failed to deleted book-review data " })
    }
}

module.exports = {
    postAReview,
    getAllReviews,
    getABookReview,
    updateABookReview,
    deleteABookReview
}