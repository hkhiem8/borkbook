const express = require('express')
const router = express.Router()
const eventCtrl = require('../controllers/events')
const isSignedIn = require('../middleware/is-signed-in');

// Index
router.get('/dogs/:dogId/events', eventCtrl.index);
// Render the form for creating a new event for a specific dog
router.get('/dogs/:dogId/events/new', eventCtrl.newFunc);
// Create
router.post('/dogs/:dogId/events', eventCtrl.create);
// Show
router.get('/dogs/:dogId/events/:id', eventCtrl.show);
// Edit
router.get('/dogs/:dogId/events/:id/edit', eventCtrl.edit);
// Update
router.put('/dogs/:dogId/events/:id', eventCtrl.update);
// Destroy
router.delete('/dogs/:dogId/events/:id', eventCtrl.destroy);

module.exports = router