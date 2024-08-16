const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/users')
const isSignedIn = require('../middleware/is-signed-in');

//Render Sign-in page
router.get('/sign-in', userCtrl.showSignIn)
// Sign In Functionality
router.post('/sign-in', userCtrl.signIn)
// Sign Up Functionality
router.post('/', userCtrl.signUp)

router.use(isSignedIn);

// Delete Functionality
router.delete('/:id', userCtrl.destroy)
// Update Functionality
router.put('/:id', userCtrl.update)
// Renders Show Page
router.get('/:id', userCtrl.show)
// Render Edit form
router.get('/:id/edit', userCtrl.edit)

module.exports = router