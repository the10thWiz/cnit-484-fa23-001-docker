require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const ejs = require("ejs");
const bcrypt = require("bcrypt");
const session = require("cookie-session");

const saltRounds = parseInt(process.env.ROUNDS);

const app = express();

app.use(
  session({
    name: "session",
    keys: ["secret_key"],
  })
);

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.connect("mongodb://db:27017/CNITClinicDB");

const hashingSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Hashing = mongoose.model("Hashing", hashingSchema);

// const patientDataSchema = new mongoose.Schema({});

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  res.render("home");
});

app.get("/loginSucces", ensureAuthenticated, function (req, res) {
  res.render("loginSucces");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  const username = req.body.email;
  const password = req.body.password;

  const foundEmail = await Hashing.findOne({ email: username });
  if (!foundEmail) {
    res.redirect("/register");
  } else {
    const result = bcrypt.compare(password, foundEmail.password);
    if (result) {
      req.session.user = username;
      res.redirect("/loginSucces");
    } else {
      res.redirect("/login");
    }
  }
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(req.body.password, salt);
  const username = req.body.email;
  const newUser = new Hashing({
    email: username,
    password: hash,
  });
  await newUser.save();

  req.session.user = username;
  res.redirect("/loginSucces");
});

async function ensureAuthenticated(req, res, next) {
  console.log("User: ", req.session.user);
  if (req.session.user) {
    const foundEmail = await Hashing.findOne({ email: req.session.user });
    if (!foundEmail) {
      res.redirect("/login");
    } else {
      return next();
    }
  } else {
    res.redirect("/login");
  }
}

app.listen("3000", function () {
  console.log("Server is running on port 3000");
});
