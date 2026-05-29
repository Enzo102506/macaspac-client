const express = require('express');
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

// GET all articles
router.get('/', getArticles);

// POST create new article
router.post('/', createArticle);

// PUT update article
router.put('/:id', updateArticle);

// DELETE toggle article status
router.delete('/:id', deleteArticle);

module.exports = router;
