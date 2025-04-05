const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
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
    }
    }, 
    { timestamps: true }
);


const Blog = mongoose.model('Blog', blogSchema); // create a model from the schema
module.exports = Blog; // export the model