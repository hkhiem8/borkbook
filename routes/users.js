const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')

//Render Sign-in page
router.get('/sign-in', userCtrl.showSignIn)
// Delete Functionality
router.delete('/:id', userCtrl.destroy)
// Update Functionality
router.put('/:id', userCtrl.update)
// Sign Up Functionality
router.post('/', userCtrl.signUp)
// Sign In Functionality
router.post('/sign-in', userCtrl.signIn)
// Renders Show Page
router.get('/:id', userCtrl.show)
// Render Edit form
router.get('/:id/edit', userCtrl.edit)

module.exports = router