const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const blogsController = require('../controllers/blogsController');
const router = express.Router();

router.post('/blog',authMiddleware.authenticateUser, blogsController.createBlog);
router.delete('/blog/:id',authMiddleware.authenticateUser, blogsController.deleteBlog);
router.put('/blog/:id',authMiddleware.authenticateUser, blogsController.updateBlog);
router.get('/blog',blogsController.getBlogs);
router.get('/blog/:id',blogsController.getBlogsDetail);

module.exports = router;
