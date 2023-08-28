const Blogs = require('../models/Blogs');

module.exports = {
  async createBlog(req, res) {
    try {
      const { title, description, time } = req.body;
      if (req.user.role !== 'admin' && req.user.role !== 'super admin') {
        return res.status(403).json({ message: 'Permission denied' });
      }
      // Create a new event
      const newBlog = new Blogs({ title, description, time,authorId:req.user.id });
      await newBlog.save();

      res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating Blog' });
    }
  },
  async getBlogs(req, res) {
    try {
      const blogs = await Blogs.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs' });
    }
  },
  async getBlogsDetail(req,res){
    try {
      const blogId = req.params.id;
      const blogs = await Blogs.findById(blogId);
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching blogs detail' });
    }
  },
  async updateBlog(req, res) {
    try {
      const blogId = req.params.id;
      const { title, description, time } = req.body;
      const blogfind = await Blogs.findById(blogId);
      if (req.user.role !== 'admin' && !req.user._id.equals(blogfind.authorId)) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      const blog = await Blogs.findByIdAndUpdate(
        blogId,
        { title, description, time },
        { new: true }
      );

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating Blog' });
    }
  },
  async deleteBlog(req, res) {
    try {
      const blogId = req.params.id;
      const blogfind = await Blogs.findById(blogId);

      if (req.user.role !== 'admin' && !req.user._id.equals(blogfind.authorId)) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      const blog = await Blogs.findByIdAndDelete(blogId);

      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting Blog' });
    }
  },
};
