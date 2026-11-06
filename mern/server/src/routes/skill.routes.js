const factory = require('./resource.routes');
const controller = require('../controllers/skill.controller');
const { skillSchema } = require('../validators');
module.exports = factory(controller, skillSchema);
