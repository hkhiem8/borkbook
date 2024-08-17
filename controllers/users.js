const User = require("../models/user");
const bcrypt = require("bcrypt");

// Sign Up
const signUp = async (req, res) => {
  try {
    const usernameTaken = await User.findOne({ username: req.body.username });
    if (usernameTaken) {
      return res.redirect("/users")
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    await User.create(req.body).then(() => res.redirect("/users/sign-in"));
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Sign In
const signIn = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username });
    if (!userExists) throw new Error("User Not Found");

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userExists.password
    );
    if (!validPassword) throw new Error("Login Failed");

    req.session.user = {
      username: userExists.username,
      _id: userExists._id,
    };

    res.redirect("/dogs");
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Render sign in form
const showSignIn = (req, res) => {
  res.render("users/signin.ejs");
};

// Render sign up form
const showSignUp = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports = {
  signUp,
  signIn,
  showSignIn,
  showSignUp,
};
