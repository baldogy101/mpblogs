const express = require('express'); // express module
const morgan = require('morgan'); // logging module
const mongoose = require('mongoose'); // mongodb module
const Blog = require('./models/blog'); // blog model

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://baldogy:fortesting101@sacproject2025.fnj5a2g.mongodb.net/node-sac?retryWrites=true&w=majority&appName=sacproject2025'; // mongodb connection string
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) // connect to mongodb;
    .then((result) => app.listen(3000)) // listen for requests
    .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public')); // serve static files from public directory
app.use(morgan('dev')); // logging middleware


const title = 'MPB v2.0'
app.get('/', (req, res) => {
    res.redirect('/blogs'); // redirect to blogs page
})

app.get('/about', (req, res) => {
    res.render('about', { page: 'About', title });
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1}) // find all blogs and sort by createdAt in descending order
    .then((result) => {
        res.render('index', { page: 'All Blogs', title, blogs: result }); // render index page with blogs
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { page: 'New Blog', title });
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { page: '404', title });
})