require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const userRouter = require("./routes/users");
const dogRouter = require("./routes/dogs");
const eventRouter = require("./routes/events");
const session = require("express-session");
const morgan = require("morgan");

const passUserToView = require("./middleware/pass-user-to-view.js");

const port = process.env.PORT ? process.env.PORT : "3000";

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
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/assets", express.static("public"));

app.use(passUserToView);

app.use("/users", userRouter);
app.use("/dogs", dogRouter);
app.use("/", eventRouter);

app.listen(port, () => {
  console.log(`Borkbook is ready on port ${port}!`);
});
