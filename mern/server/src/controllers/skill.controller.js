const crud = require('./crud.factory');
const Skill = require('../models/Skill');
module.exports = crud(Skill, 'Skill');
