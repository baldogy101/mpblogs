const Blog = require('../models/Blog');


const title = 'MPB';
module.exports.blog_index = async (req, res) => {
    try{
        const blogs = await Blog.find()
        .populate('author', 'username') // get all User document
        .sort({ createdAt: -1 }); // find all blogs sorted by createdAt in descending order
        res.render('blogs/home', {
            blogs, 
            page: 'All Blogs', 
            title});
    }
    catch (err) {
        console.log('Error fetching blogs: ', err);
        res.status(500).send('Somthing went wrong');
    }
}

module.exports.blog_create_get = (req, res) => {
    res.render('blogs/create', { page: 'New Blog', title });
}

module.exports.blog_create_post = async (req, res) => {
    try{
        const blogData = {
            ...req.body,
            author: res.locals.user._id, // attach username as author
        };

        const blog = new Blog(blogData);
        console.log('Saving blog: ', blog); 

        await blog.save();
        res.redirect('/blogs');
    }
    catch (err) {
        console.log('Error saving blog: ', err);
        res.status(500).send('Failed to save blog');
    }
}

module.exports.blog_details = async (req, res) => {
    const id = req.params.id; // get id from the req parameter
    try{
        const blog = await Blog.findById(id).populate('author');
        if (!blog) {
            return res.status(404).render('404', { page: 'Blog not found', title });
        }
        res.render('blogs/details', { 
            page: blog.title, 
            blog,
            title
        });

    }
    catch (err) {
        console.log(err);
        res.status(404).render('404', { page: 'Blog not found', title });
    }
};

module.exports.blog_edit_get = () => {};
module.exports.blog_edit_put = () => {};
module.exports.blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json( { redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        })
    
};