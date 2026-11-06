const factory = require('./resource.routes');
const controller = require('../controllers/project.controller');
const { projectSchema } = require('../validators');
module.exports = factory(controller, projectSchema, { publicGetOne: true });
