const crud = require('./crud.factory');
const Project = require('../models/Project');
module.exports = crud(Project, 'Project', { bySlug: true, featuredFilter: true });
