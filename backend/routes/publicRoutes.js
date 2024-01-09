const express = require('express')
const router = express.Router()
const {getProjects, getProject, getProfile} = require('../controllers/publicController')


router.get('/projects', getProjects)

router.get('/projects/:id', getProject)

router.get('/user/profile/:id', getProfile)



module.exports = router