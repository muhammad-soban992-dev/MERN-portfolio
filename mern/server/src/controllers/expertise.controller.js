const crud = require('./crud.factory');
const Expertise = require('../models/Expertise');
module.exports = crud(Expertise, 'Expertise');
