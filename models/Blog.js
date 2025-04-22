const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // this must match the model name in `mongoose.model('user', userSchema)`
        required: true
    }
}, { timestamps: true})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;