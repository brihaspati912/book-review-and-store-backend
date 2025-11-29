const mongoose = require('mongoose');

const bookReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    trending: {
        type: Boolean,
        required: true
    },
    coverImage: {
        type: String,

    },
    newPrice: {
        type: Number,

    },
    oldPrice: {
        type: Number,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},
    { timestamps: true })

const BookReview = mongoose.model('BookReview', bookReviewSchema);
module.exports = BookReview;