const crud = require('./crud.factory');
const Education = require('../models/Education');
module.exports = crud(Education, 'Education');
