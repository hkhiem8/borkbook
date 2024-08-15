const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')

// Index
router.get('/', userCtrl.index)
// New
router.get('/new', userCtrl.newFunc)
// SignIn
router.get('/sign-in', userCtrl.showSignIn)
// Delete
router.delete('/:id', userCtrl.destroy)
// Update
router.put('/:id', userCtrl.update)
// Create
router.post('/', userCtrl.signUp)
// Sign In Functionality
router.post('/sign-in-user', userCtrl.signIn)
// Edit
router.get('/:id/edit', userCtrl.edit)
// Show
router.get('/:id', userCtrl.show)

module.exports = router