import Blog from '../models/Blog.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
}).single('image');

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createBlog = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      const imagePath = req.file ? req.file.path : null;

      const blog = new Blog({
        title,
        content,
        imagePath,
        author: req.user._id
      });

      await blog.save();
      await blog.populate('author', 'name email');

      res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};

export const updateBlog = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to update this blog' });
      }

      const { title, content } = req.body;
      if (title) blog.title = title;
      if (content) blog.content = content;

      if (req.file) {
        if (blog.imagePath && fs.existsSync(blog.imagePath)) {
          fs.unlinkSync(blog.imagePath);
        }
        blog.imagePath = req.file.path;
      }

      blog.updatedAt = new Date();
      await blog.save();
      await blog.populate('author', 'name email');

      res.json({ message: 'Blog updated successfully', blog });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    if (blog.imagePath && fs.existsSync(blog.imagePath)) {
      fs.unlinkSync(blog.imagePath);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
