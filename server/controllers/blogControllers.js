const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user: req.user._id });
  res.json(blogs);
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error("Please fill all fields!");
  } else {
    const blog = new Blog({ user: req.user._id, title, content });
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(400).json({
      message: "Blog not found",
    });
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("You can not edit this blog!");
  }
  if (blog) {
    blog.title = title;
    blog.content = content;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(400);
    throw new Error("Blog does not exist!");
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("You can not delete this blog!");
  }
  if (blog) {
    await blog.deleteOne();
    res.json({ message: "Blog removed!" });
  } else {
    res.status(400);
    throw new Error("Blog does not exist!");
  }
});

module.exports = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
