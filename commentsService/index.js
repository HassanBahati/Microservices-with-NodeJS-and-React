// import  modules
const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");

// create new app as instance of express
const app = express();
app.use(bodyParser.json());

// store all posts that get created
const posts = {};

// get request comments of a post 
app.get("/posts/:id/comments", (req, res) => {
  res.send(posts);
});

//post request a comment to a post 
app.post("/posts/:id/comments", (req, res) => {
  // generate random id
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  //send post that was just created to user
  res.status(201).send(posts[id]);
});

// app to listen on port 4000
app.listen(4001, () => {
  console.log("comments server listening on 4001");
});
