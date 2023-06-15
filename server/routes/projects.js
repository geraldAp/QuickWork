const express = require('express')

const {
    getProjects,
    getProject,
    createProject,
    deleteProject,
    updateProject,
    getAdminProjects
} = require('../controllers/projectControllers')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


// require auth for all workout routes
// this middle ware will be fired before every rout here and protect each route
router.use(requireAuth)

// Get all projects 
router.get('/', getProjects)

// get admin projects 
router.get('/admin',getAdminProjects)

// Get a single project 
router.get('/:id', getProject)

// post a new project 
router.post('/', createProject)

// DELETE a project
router.delete('/:id', deleteProject)

// UPDATE a project
router.patch('/:id', updateProject)

module.exports = router