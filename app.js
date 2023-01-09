//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent =
  "The strength of the team is each individual member. The strength of each member is the team. Take a look at our diverse team of innovative thinkers that want to make a difference..";
const aboutContent =
  "GES-COENGG, based in Nashik, is dedicated to the cause of student empowerment via education. It is well-known for its excellent teaching, collaborative research, industrial linkages, and large alumni network. To achieve excellence with total quality in all activities of lifelong learning is the main motive of Gokhale Education Society.";
const contactContent =
  "Gokhale Education Society's R. H. Sapat College of Engineering, Management Studies and Research, Nashik https://gdscgescoengg.live/contact.html";

const app = express();
const db = mongoose.connect(
  "mongodb+srv://Ruchi:Roxie15@node-learn.am6ml.mongodb.net/postsDB?retryWrites=true&w=majority"
);

const postsSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Post = mongoose.model("Post", postsSchema);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const posts = [];

app.get("/", (req, res) => {
  Post.find({}, function (err, posts) {
    res.render("home", { homeStartingContent, posts });
  });
});

app.get("/about", (req, res) => {
  res.render("about", { aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  if (req.body.postTitle !== "" && req.body.postBody !== "") {
    const post = new Post({
      title: req.body.postTitle,
      body: req.body.postBody,
    });
    post.save();
  }
  res.redirect("/");
});

app.get("/posts/:postId", (req, res) => {
  Post.findOne({ _id: req.params.postId }, function (err, post) {
    if (!err) {
      res.render("post", { post });
    }
  });
});

app.listen(8080, function () {
  console.log("Server started on port 3000");
});
