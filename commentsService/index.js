// import  modules
const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

// create new app as instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// store all posts that get created
const commentsByPostId = {};

// get request comments of a post
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

//post request a comment to a post
app.post("/posts/:id/comments", async (req, res) => {
  // generate random id
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  // generate an object with the post id being a key and the comment value
  commentsByPostId[req.params.id] = comments;

  //emit an event to event bus when a comment is created
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  // return all comments I
  res.status(201).send(comments);
});

// app to listen on port 4000
app.listen(4001, () => {
  console.log("comments server listening on 4001");
});
