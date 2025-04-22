const express = require('express');
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middlewares/middleware');

const router = express.Router();

// All blog routes
router.get('/blogs', blogController.blog_index); // list all blogs
router.get('/blogs/create',  blogController.blog_create_get); // show create form
router.post('/blogs/create', requireAuth, blogController.blog_create_post); // handle create

router.get('/blogs/:id', blogController.blog_details); // blog detail page
router.get('/blogs/:id/edit', requireAuth, blogController.blog_edit_get); // show edit form
router.put('/blogs/:id', requireAuth, blogController.blog_edit_put); // handle update
router.delete('/blogs/:id', requireAuth, blogController.blog_delete); // handle delete

router.get('/login', authController.login_get);
router.get('/signup', authController.signup_get);
router.post('/login', authController.login_post);
router.post('/signup', authController.signup_post);
router.get('/logout', authController.logout_get);

module.exports = router;
