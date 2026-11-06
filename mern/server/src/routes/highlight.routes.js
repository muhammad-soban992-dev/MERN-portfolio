const factory = require('./resource.routes');
const controller = require('../controllers/highlight.controller');
const { highlightSchema } = require('../validators');
module.exports = factory(controller, highlightSchema);
