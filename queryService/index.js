// import  modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create new app as instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

//data structure to store posts
const posts = {};

//when someone tries ti get posts
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];

    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    //update the values
    comment.status = status;
    comment.content = content;
  }

  console.log(posts);
  //send status sucessful
  res.send({});
});

// app to listen on port 4005
app.listen(4002, () => {
  console.log("query service listening on 4002");
});
