require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const session = require("express-session");
const morgan = require('morgan');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

mongoose.connect(MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("MongoDB is up and running");
});

mongoose.connection.on("error", () => {
  console.log("MongoDB error");
});

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.data = {};
  next();
});
app.use(methodOverride("_method"));
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use('/assets', express.static('public'))

app.listen(3000, () => {
  console.log(`Borkbook is ready on port ${port}!`);
});
