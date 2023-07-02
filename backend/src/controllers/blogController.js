import dbConnect from "../lib/mongodb.js";
import Blog from "../models/blog.js";

// Get all articles
async function getArticles(req, res) {
  
  await dbConnect();
  try {
    const articles = await Blog.find({});
    res.status(200).json({articles: articles, ret: true});
  } catch (error) {
    res.status(500).json({ error: "Internal server error", ret: false });
  }
}

// Create a new article
async function createArticle(req, res) {
  
  await dbConnect();
  const { title, author, content } = req.body;

  try {

    const newBlog = new Blog({ title, author, content });
    await newBlog.save();
    res
      .status(201)
      .json({
        message: "Article created successfully", ret: true
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating article", ret: false });
  }
}

// Get a article by ID
async function getArticleById(req, res) {
  try {
    const { id } = req.params;

    await dbConnect();
    const article = await Blog.findOne({ _id: id });

    if (!article) {
      res.status(404).json({ error: "Article not found", ret: false });
    } else {
      res.json({article: article, ret: true});
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", ret: false });
  }
}

// Update a article
async function updateArticle(req, res) {
  await dbConnect();
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const result = await Blog.updateOne({ _id: id }, { $set: { title, content, author } });

    if (result.modifiedCount === 0) {
      res.status(404).json({ error: "Article not found", ret: false });
    } else {
      res.json({ message: "Article updated successfully", ret: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", ret: false });
  }
}

// Delete a article
async function deleteArticle(req, res) {
  
  
  await dbConnect();
  try {
    const { id } = req.params;
    await dbConnect();
    const result = await Blog.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Article not found", ret: false });
    } else {
      res.json({ message: "Article deleted successfully", ret: true });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error", ret: false });
  }
}

export { getArticles, createArticle, getArticleById, updateArticle, deleteArticle };
