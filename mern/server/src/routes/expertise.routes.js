const factory = require('./resource.routes');
const controller = require('../controllers/expertise.controller');
const { expertiseSchema } = require('../validators');
module.exports = factory(controller, expertiseSchema);
