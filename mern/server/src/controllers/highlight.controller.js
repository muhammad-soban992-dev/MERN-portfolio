const crud = require('./crud.factory');
const Highlight = require('../models/Highlight');
module.exports = crud(Highlight, 'Highlight');
