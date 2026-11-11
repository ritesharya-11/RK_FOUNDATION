import Project from '../models/Project.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// @desc    Get all projects/campaigns
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const { category, urgent, status, featured } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    if (urgent === 'true') {
      query.isUrgent = true;
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }
    if (status) {
      query.status = status;
    } else if (req.query.all !== 'true') {
      query.status = 'active';
    }

    const projects = await Project.find(query).sort({ isUrgent: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, projects });
  } catch (err) {
    next(err);
  }
};

// @desc    Get project by slug or ID
// @route   GET /api/projects/:slugOrId
// @access  Public
export const getProjectBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let project = null;

    if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(slugOrId);
    }
    if (!project) {
      project = await Project.findOne({ slug: slugOrId });
    }

    if (!project) {
      return res.status(404).json({ success: false, message: 'Campaign/Project not found.' });
    }

    res.status(200).json({ success: true, project });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new project/campaign
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res, next) => {
  try {
    const { title, slug } = req.body;
    const finalSlug = slug ? slugify(slug) : slugify(title);

    const existing = await Project.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A campaign with this title or slug already exists.',
      });
    }

    const project = await Project.create({
      ...req.body,
      slug: finalSlug,
    });

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully.',
      project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project/campaign
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Campaign not found.' });
    }

    if (req.body.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title);
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Campaign updated successfully.',
      project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete project/campaign
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Campaign not found.' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Campaign deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
