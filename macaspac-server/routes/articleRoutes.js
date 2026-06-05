const express = require('express');
const {
  getArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const {
  authMiddleware,
  optionalAuthMiddleware,
  requireEditorOrAdmin,
  requireAdmin,
} = require('../middleware/authMiddleware');

const router = express.Router();

// GET articles (public viewable active articles for guests/viewers, full list for editors/admins)
router.get('/', optionalAuthMiddleware, getArticles);

// GET single article by slug
router.get('/:slug', optionalAuthMiddleware, getArticleBySlug);

// POST create new article (editor/admin only)
router.post('/', authMiddleware, requireEditorOrAdmin, createArticle);

// PUT update article (editor/admin only)
router.put('/:id', authMiddleware, requireEditorOrAdmin, updateArticle);

// DELETE toggle article visibility (admin only)
router.delete('/:id', authMiddleware, requireAdmin, deleteArticle);

module.exports = router;
