const factory = require('./resource.routes');
const controller = require('../controllers/education.controller');
const { educationSchema } = require('../validators');
module.exports = factory(controller, educationSchema);
