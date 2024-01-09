const express = require('express')
const router = express.Router()
const {getCommentsByProjectId, getCommentsByUserId, CreateComment} = require('../controllers/commentController')

router.post('/', CreateComment)

router.get('/projects/:id', getCommentsByProjectId)

router.post('/user/:id', getCommentsByUserId)

module.exports = router