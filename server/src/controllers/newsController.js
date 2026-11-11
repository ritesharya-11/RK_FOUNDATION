import News from '../models/News.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// @desc    Get all published news & articles
// @route   GET /api/news
// @access  Public
export const getNews = async (req, res, next) => {
  try {
    const { category, tag, search } = req.query;
    let query = { isPublished: true };

    if (req.query.all === 'true') {
      delete query.isPublished;
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    const articles = await News.find(query).sort({ publishedAt: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: articles.length, articles });
  } catch (err) {
    next(err);
  }
};

// @desc    Get news article by slug or ID
// @route   GET /api/news/:slugOrId
// @access  Public
export const getNewsBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let article = null;

    if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      article = await News.findById(slugOrId);
    }
    if (!article) {
      article = await News.findOne({ slug: slugOrId });
    }

    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    // Increment views count
    article.viewsCount += 1;
    await article.save({ validateBeforeSave: false });

    res.status(200).json({ success: true, article });
  } catch (err) {
    next(err);
  }
};

// @desc    Create news article
// @route   POST /api/news
// @access  Private (Admin)
export const createNews = async (req, res, next) => {
  try {
    const { title, slug } = req.body;
    const finalSlug = slug ? slugify(slug) : slugify(title);

    const existing = await News.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An article with this title or slug already exists.',
      });
    }

    const article = await News.create({
      ...req.body,
      slug: finalSlug,
    });

    res.status(201).json({
      success: true,
      message: 'Article published successfully.',
      article,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update news article
// @route   PUT /api/news/:id
// @access  Private (Admin)
export const updateNews = async (req, res, next) => {
  try {
    let article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    if (req.body.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title);
    }

    article = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Article updated successfully.',
      article,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete news article
// @route   DELETE /api/news/:id
// @access  Private (Admin)
export const deleteNews = async (req, res, next) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Article deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
