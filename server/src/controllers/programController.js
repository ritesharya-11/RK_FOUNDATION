import Program from '../models/Program.js';

// Helper to slugify
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

// @desc    Get all programs (Public / Filterable)
// @route   GET /api/programs
// @access  Public
export const getPrograms = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    let query = { isActive: true };

    if (category && category !== 'All') {
      const aliases = {
        'Children Development': ['Children Development', 'Child Education'],
        'Education and Literacy': ['Education and Literacy', 'Child Education'],
        "Women's Development and Empowerment": ["Women's Development and Empowerment", 'Women Empowerment'],
        'Health and Family Welfare': ['Health and Family Welfare', 'Healthcare & Relief'],
        'Aged / Elderly Care': ['Aged / Elderly Care', 'Elderly Care'],
        'Disaster Management & Emergency Relief': [
          'Disaster Management & Emergency Relief',
          'Nutrition & Food Security',
          'Healthcare & Relief',
        ],
      };

      if (aliases[category]) {
        query.category = { $in: aliases[category] };
      } else {
        query.category = { $regex: new RegExp('^' + category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') };
      }
    }
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Admins requesting all can pass includeInactive=true
    if (req.query.includeInactive === 'true') {
      delete query.isActive;
    }

    const programs = await Program.find(query).sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: programs.length, programs });
  } catch (err) {
    next(err);
  }
};

// @desc    Get program by slug or ID
// @route   GET /api/programs/:slugOrId
// @access  Public
export const getProgramBySlugOrId = async (req, res, next) => {
  try {
    const { slugOrId } = req.params;
    let program = null;

    if (slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      program = await Program.findById(slugOrId);
    }
    if (!program) {
      program = await Program.findOne({ slug: slugOrId });
    }

    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found.' });
    }

    res.status(200).json({ success: true, program });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new program
// @route   POST /api/programs
// @access  Private (Admin)
export const createProgram = async (req, res, next) => {
  try {
    const { title, slug } = req.body;
    const finalSlug = slug ? slugify(slug) : slugify(title);

    const existing = await Program.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A program with this slug/title already exists.',
      });
    }

    const program = await Program.create({
      ...req.body,
      slug: finalSlug,
    });

    res.status(201).json({
      success: true,
      message: 'Program created successfully.',
      program,
    });
  } catch (err) {
    next(err);
  }
};

const isObjectId = (val) => typeof val === 'string' && /^[0-9a-fA-F]{24}$/.test(val);

const findProgramByIdOrSlug = async (idOrSlug, bodySlug) => {
  if (isObjectId(idOrSlug)) {
    const byId = await Program.findById(idOrSlug);
    if (byId) return byId;
  }
  const byParamSlug = await Program.findOne({ slug: idOrSlug });
  if (byParamSlug) return byParamSlug;
  if (bodySlug) {
    return Program.findOne({ slug: slugify(bodySlug) });
  }
  return null;
};

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private (Admin)
export const updateProgram = async (req, res, next) => {
  try {
    let program = await findProgramByIdOrSlug(req.params.id, req.body?.slug);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found.' });
    }

    if (req.body.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title);
    }

    program = await Program.findByIdAndUpdate(program._id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Program updated successfully.',
      program,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private (Admin)
export const deleteProgram = async (req, res, next) => {
  try {
    const program = await findProgramByIdOrSlug(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found.' });
    }

    await Program.findByIdAndDelete(program._id);
    res.status(200).json({ success: true, message: 'Program deleted successfully.' });
  } catch (err) {
    next(err);
  }
};
