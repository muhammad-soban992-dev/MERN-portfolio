const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const slugify = require('../utils/slugify');

function crud(Model, label, opts = {}) {
  const list = asyncHandler(async (req, res) => {
    const filter = {};
    if (opts.featuredFilter && req.query.featured === 'true') filter.featured = true;
    const items = await Model.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: items, message: `${label} list retrieved.` });
  });
  const getOne = asyncHandler(async (req, res) => {
    const item = opts.bySlug
      ? await Model.findOne({ slug: req.params.slug })
      : await Model.findById(req.params.id);
    if (!item) throw ApiError.notFound(`${label} not found.`);
    res.json({ success: true, data: item, message: `${label} retrieved.` });
  });
  const create = asyncHandler(async (req, res) => {
    const data = { ...req.body };
    if (opts.bySlug && !data.slug) data.slug = slugify(data.title);
    const item = await Model.create(data);
    res.status(201).json({ success: true, data: item, message: `${label} created.` });
  });
  const update = asyncHandler(async (req, res) => {
    const data = { ...req.body };
    if (opts.bySlug && !data.slug) delete data.slug; // keep the existing slug when none is sent
    const item = await Model.findByIdAndUpdate(req.params.id, { $set: data }, { new: true, runValidators: true });
    if (!item) throw ApiError.notFound(`${label} not found.`);
    res.json({ success: true, data: item, message: `${label} updated.` });
  });
  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw ApiError.notFound(`${label} not found.`);
    res.json({ success: true, data: null, message: `${label} deleted.` });
  });
  return { list, getOne, create, update, remove };
}
module.exports = crud;
