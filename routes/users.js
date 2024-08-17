const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");

//Render Sign-in page
router.get("/sign-in", userCtrl.showSignIn);
// Sign In Functionality
router.post("/sign-in", userCtrl.signIn);
//Render Sign-up page
router.get("/", userCtrl.showSignUp);
// Sign Up Functionality
router.post("/", userCtrl.signUp);

module.exports = router;