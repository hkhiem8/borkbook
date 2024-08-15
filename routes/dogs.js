const express = require('express')
const router = express.Router()
const dogCtrl = require('../controllers/dogs')

// Index
router.get('/', dogCtrl.index)
// New
router.get('/new', dogCtrl.newFunc)
// Delete
router.delete('/:id', dogCtrl.destroy)
// Update
router.put('/:id', dogCtrl.update)
// Create
router.post('/', dogCtrl.create)
// Edit
router.get('/:id/edit', dogCtrl.edit)
// Show
router.get('/:id', dogCtrl.show)

module.exports = router