const express = require("express");
const router = express.Router();
const dogCtrl = require("../controllers/dogs");
const isSignedIn = require("../middleware/is-signed-in");

router.use(isSignedIn);

// Index
router.get("/", dogCtrl.index);
// New - Renders the form to create a new dog
router.get("/new", dogCtrl.newFunc);
// Delete
router.delete("/:id", dogCtrl.destroy);
// Update
router.put("/:id", dogCtrl.update);
// Create
router.post("/", dogCtrl.create);
// Show
router.get("/:id", dogCtrl.show);
// Edit - Renders the form to update an existing dog
router.get("/:id/edit", dogCtrl.edit);

module.exports = router;
