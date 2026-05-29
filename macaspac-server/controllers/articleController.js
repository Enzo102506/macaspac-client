const Article = require('../models/Article');

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find().select('-__v');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { slug, title, paragraphs, status, isActive } = req.body;

    // Check if slug already exists
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return res.status(400).json({ message: 'Article with this slug already exists' });
    }

    const newArticle = new Article({
      slug,
      title,
      paragraphs,
      status,
      isActive,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
};

// Update an article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, paragraphs, status, isActive } = req.body;

    // Check if trying to change slug to one that already exists
    if (slug) {
      const existingArticle = await Article.findOne({ slug, _id: { $ne: id } });
      if (existingArticle) {
        return res.status(400).json({ message: 'Article with this slug already exists' });
      }
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        slug,
        title,
        paragraphs,
        status,
        isActive,
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article', error: error.message });
  }
};

// Delete (toggle status) an article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Toggle the status and isActive
    article.status = article.status === 'active' ? 'inactive' : 'active';
    article.isActive = !article.isActive;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling article status', error: error.message });
  }
};
