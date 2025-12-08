const Book = require("./BookModel");


const postABook = async (req, res) => {
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
}

//get all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(books)
    } catch (error) {
        console.error("Error getting Book", error);
        res.status(500).send({ message: "Books not found " })
    }
}
//get a books
const getABook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({ message: "Book not found " })
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error getting Book", error);
        res.status(500).send({ message: "Failed to fecth book  " })
    }
}

//update a book
const updateABook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedbook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedbook) {
            res.status(404).send({ message: "Book is not found " })
        }
        res.status(200).send({
            message: "Sucessfully updated",
            book: updatedbook
        })
    } catch (error) {
        console.error("Error updating Book", error);
        res.status(500).send({ message: "Failed to update book data " })
    }
}

//delete a book
const deleteABook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedbook = await Book.findByIdAndDelete(id);
        if (!deletedbook) {
            res.status(404).send({ message: "Book is not found " })
        }
        res.status(200).send({
            message: "Sucessfully deleted",
            book: deletedbook
        })
    } catch (error) {
        console.error("Error deleting Book", error);
        res.status(500).send({ message: "Failed to delete book data " })
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getABook,
    updateABook,
    deleteABook
}