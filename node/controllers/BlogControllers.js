const Blog = require("../models/BlogsModel");

const addBlog = async (req, res) => {
  const { title, description } = req.body;
  try {
    const blog = await Blog.findOne({ title, description });
    if (blog) {
      return res.status(400).json({
        success: false,
        message: "Blog already exists",
      });
    }

    const newBlog = await Blog.create({
      title,
      description,
      owner: null,
    });

    if (!newBlog) {
      return res.status(400).json({
        success: false,
        message: "Failed to create blog",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log("error in creating blog : ", error);
    return res.status(400).json({
      success: false,
      message: "Failed to create blog",
      error,
    });
  }
};

const allBlog = async (req, res) => {
  const { page = 1, limit = 6, text } = req.query;
  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limitNumber);

    const blogs = await Blog.find(
      text
        ? {
            $or: [
              { title: { $regex: text, $options: "i" } },
              { description: { $regex: text, $options: "i" } },
            ],
          }
        : {}
    )
      .skip((pageNumber - 1) * limitNumber) // Skip the previous pages
      .limit(limitNumber) // Limit the number of blogs to fetch
      .sort({ createdAt: -1 }); // Optional: Sort by createdAt in descending order

    if (!blogs.length) {
      return res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Blog retrieved successfully",
      data: blogs,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.log("error in retrieving blog : ", error);
    return res.status(400).json({
      success: false,
      message: "Failed to retrieve blog",
      error,
    });
  }
};

const singleBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (error) {
    console.log("error in retrieve blog : ", error);
    return res.status(400).json({
      success: false,
      message: "Failed to retreieve blog",
      error,
    });
  }
};

module.exports = {
  addBlog,
  allBlog,
  singleBlog,
};
