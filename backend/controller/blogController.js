const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.createBlog = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const image = req.file.buffer.toString("base64");
    const author = res.locals.userId;
    if (!title || !description || !image) {
      res
        .status(400)
        .json({ error: "Title, descxription and image are required" });
    }
    const data = new Blog({
      title,
      description,
      image,
      author,
      category,
    });
    await data
      .save()
      .then(() => {
        res.status(200).json({ message: "Blog created successfully" });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    if (category == "all") {
      await Blog.find()
        .populate({ path: "author", select: "name profile" })
        .then((data) => {
          res.status(200).json({ message: data });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    } else {
      await Blog.find({ category })
        .populate({ path: "author", select: "name profile" })
        .then((data) => {
          res.status(200).json({ message: data });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getSingleBlog = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const blogId = req.params.id;
    await Blog.findById({ _id: blogId })
      .populate({ path: "author", select: "name profile" })
      .then((data) => {
        const likedIndex = data.likes.findIndex(
          (like) => like.toString() === userId.toString()
        );

        const dislikedIndex = data.dislikes.findIndex(
          (dislike) => dislike.toString() === userId.toString()
        );
        res.status(200).json({
          message: data,
          likedStatus: likedIndex,
          dislikedStatus: dislikedIndex,
        });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getMyBlogs = async (req, res) => {
  try {
    const userId = res.locals.userId;
    await Blog.find({ author: userId })
      .populate({ path: "author", select: "name profile" })
      .then((data) => {
        res.status(200).json({ message: data });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateBlog = async (req, res) => {
  try {
    const author = res.locals.userId;
    const blogId = req.params.id;
    const updatedData = req.body;
    if (req.file) {
      updatedData.image = req.file.buffer.toString("base64");
    }
    const resp = await Blog.findOne({ _id: blogId, author: author });
    if (resp) {
      await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $set: updatedData },
        { new: true }
      )
        .then((data) => {
          res.status(200).json({ message: "Blog updated successfully" });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    } else {
      res.status(400).json({ error: "Blog not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    const author = res.locals.userId;
    const blogId = req.params.id;
    const resp = await Blog.findOne({ _id: blogId, author: author });
    if (resp) {
      await Blog.findByIdAndDelete({ _id: blogId })
        .then((data) => {
          res.status(200).json({ message: "Blog deleted successfully" });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    } else {
      res.status(400).json({ error: "Blog not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const userId = res.locals.userId;

    const likedIndex = blog.likes.findIndex(
      (like) => like.toString() === userId.toString()
    );

    const dislikedIndex = blog.dislikes.findIndex(
      (dislike) => dislike.toString() === userId.toString()
    );

    if (likedIndex !== -1) {
      // User already liked the blog, so remove the like
      blog.likes.splice(likedIndex, 1);
    } else {
      // User didn't like the blog, so add the like
      blog.likes.push(userId);

      if (dislikedIndex !== -1) {
        // User already disliked the blog, so remove the dislike
        blog.dislikes.splice(dislikedIndex, 1);
      }
    }

    await blog.save();
    res.status(200).json({
      message: "Blog liked",
      likeCount: blog.likes.length,
      dislikeCount: blog.dislikes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.disLikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const userId = res.locals.userId;

    const likedIndex = blog.likes.findIndex(
      (like) => like.toString() === userId
    );
    const dislikedIndex = blog.dislikes.findIndex(
      (dislike) => dislike.toString() === userId
    );

    if (dislikedIndex !== -1) {
      // User already disliked the blog, so remove the dislike
      blog.dislikes.splice(dislikedIndex, 1);
    } else {
      // User didn't dislike the blog, so add the dislike
      blog.dislikes.push(userId);

      if (likedIndex !== -1) {
        // User already liked the blog, so remove the like
        blog.likes.splice(likedIndex, 1);
      }
    }

    await blog.save();
    res.status(200).json({
      message: "Dislike",
      likeCount: blog.likes.length,
      dislikeCount: blog.dislikes.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.serachBlog = async (req, res) => {
  try {
    const { search } = req.query;
    const regex = new RegExp(search, "i");
    const query = {
      $or: [{ title: { $regex: regex } }, { category: { $regex: regex } }],
    };
    const data = await Blog.find(query).populate({
      path: "author",
      select: "name profile",
    });
    if (data) {
      res.status(200).json({ message: data });
    } else {
      res.status(400).json({ error: "No blog found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.addComment = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const content = req.body.comment;
    const blogId = req.params.id;

    const post = await Blog.findById({ _id: blogId });
    if (!post) {
      res.status(400).json({ message: "Blog not found" });
    }
    const newComment = {
      content: content,
      user: userId,
    };
    post.comments.push(newComment);
    await post.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.getComments = async (req, res) => {
  try {
    const blogId = req.params.id;
    const post = await Blog.findById({ _id: blogId }, { comments: 1 }).populate(
      {
        path: "comments",
        populate: {
          path: "user",
          select: "name profile",
        },
      }
    );
    if (!post) {
      res.status(400).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: post });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
