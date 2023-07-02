
import { getArticles, createArticle, getArticleById, updateArticle, deleteArticle }  from '../controllers/blogController.js';

import express from "express";


const router = express.Router();

// Define your routes
router.get('/', getArticles);
router.post('/', createArticle);
router.get('/:id', getArticleById);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

export default router;
