const Article = require('../models/Article');

const normalizeArticleInput = (body) => {
  const slug = String(body.slug || '').trim().toLowerCase();
  const title = String(body.title || '').trim();
  const excerpt = String(body.excerpt || '').trim();
  const category = String(body.category || 'General').trim() || 'General';
  const coverImage = String(body.coverImage || '').trim();
  const imageUrl = String(body.imageUrl || '').trim();
  const paragraphs = Array.isArray(body.paragraphs)
    ? body.paragraphs.map((p) => String(p || '').trim()).filter((p) => p.length > 0)
    : [];
  const status = body.status === 'published' ? 'published' : 'draft';
  const isVisible = Boolean(body.isVisible);
  const publishDate = body.publishDate ? new Date(body.publishDate) : null;

  return { slug, title, excerpt, category, coverImage, imageUrl, paragraphs, status, isVisible, publishDate };
};

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    // Public/viewers see only published & visible articles
    const filter = (!req.user || req.user.type === 'viewer')
      ? { status: 'published', isVisible: true, isActive: true }
      : {};

    console.log('Fetching articles with filter:', filter, 'User:', req.user?.type || 'guest');
    
    const articles = await Article.find(filter)
      .select('-__v')
      .populate('author', 'firstName lastName email type')
      .sort({ publishDate: -1 });

    console.log('Found articles:', articles.length);
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
};

// Get single article by slug
exports.getArticleBySlug = async (req, res) => {
  try {
    const rawSlug = String(req.params.slug || '').trim();
    const slug = rawSlug.toLowerCase();
    const filter = (!req.user || req.user.type === 'viewer')
      ? { slug, status: 'published', isVisible: true, isActive: true }
      : { slug, isActive: true };

    console.log('Fetching article by slug:', rawSlug, '->', slug, 'User:', req.user?.type || 'guest');

    const article = await Article.findOne(filter)
      .select('-__v')
      .populate('author', 'firstName lastName email type');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {
      slug,
      title,
      excerpt,
      category,
      paragraphs,
      status,
      isVisible,
      publishDate,
      coverImage,
      imageUrl,
    } = normalizeArticleInput(req.body);

    if (!slug || !title || paragraphs.length === 0) {
      return res.status(400).json({ message: 'Slug, title, and paragraphs are required' });
    }

    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      return res.status(400).json({ message: 'Article with this slug already exists' });
    }

    let pubDate = publishDate;
    if (status === 'published' && !publishDate) {
      pubDate = new Date();
    }

    const newArticle = new Article({
      slug,
      title,
      excerpt: excerpt || (paragraphs[0] || '').slice(0, 200),
      category,
      paragraphs,
      status,
      isVisible,
      publishDate: pubDate,
      coverImage,
      imageUrl,
      author: req.user.id,
      authorRole: req.user.type,
      isActive: true,
    });

    console.log('Creating article:', { slug, title, status, isVisible, publishDate: pubDate });

    const savedArticle = await newArticle.save();
    console.log('Article saved:', savedArticle._id, 'with publishDate:', savedArticle.publishDate);
    
    const populatedArticle = await savedArticle.populate('author', 'firstName lastName email type');
    res.status(201).json(populatedArticle);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Article slug already exists', error: error.message });
    }
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
};

// Update an article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      slug,
      title,
      excerpt,
      category,
      paragraphs,
      status,
      isVisible,
      publishDate,
      coverImage,
      imageUrl,
    } = normalizeArticleInput(req.body);

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (slug) {
      const existingArticle = await Article.findOne({ slug, _id: { $ne: id } });
      if (existingArticle) {
        return res.status(400).json({ message: 'Article with this slug already exists' });
      }
    }

    const existingArticle = await Article.findById(id);
    if (!existingArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.user.type === 'editor' && existingArticle.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Editors may only edit their own articles' });
    }

    let pubDate = publishDate;
    if (existingArticle.status === 'draft' && status === 'published' && !publishDate) {
      pubDate = new Date();
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        slug,
        title,
        excerpt: excerpt || (paragraphs[0] || '').slice(0, 200),
        category,
        paragraphs,
        status,
        isVisible,
        publishDate: pubDate,
        coverImage,
        imageUrl,
      },
      { returnDocument: 'after' }
    ).populate('author', 'firstName lastName email type');

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(updatedArticle);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Article slug already exists', error: error.message });
    }
    res.status(400).json({ message: 'Error updating article', error: error.message });
  }
};

// Delete (toggle visibility) an article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Toggle the visibility
    article.isVisible = !article.isVisible;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling article visibility', error: error.message });
  }
};
