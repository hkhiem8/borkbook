const express = require('express')
const router = express.Router()
const eventCtrl = require('../controllers/events')

// Index
router.get('/', eventCtrl.index);
// New
router.get('/new', eventCtrl.newFunc);
// Create
router.post('/', eventCtrl.create);
// Show
router.get('/:id', eventCtrl.show);
// Edit
router.get('/:id/edit', eventCtrl.edit);
// Update
router.put('/:id', eventCtrl.update);
// Destroy
router.delete('/:id', eventCtrl.destroy);

module.exports = router