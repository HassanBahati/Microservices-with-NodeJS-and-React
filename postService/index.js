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
const posts = {};

// get request
app.get("/posts", (req, res) => {
  res.send(posts);
});

//post request
app.post("/posts", async (req, res) => {
  // generate random id
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  //emit an event to event bus when post is created
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  //send post that was just created to user
  res.status(201).send(posts[id]);
});

//route that recieves event from event bus
app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);

  // respond ok when event is received
  res.send({});
});

// app to listen on port 4000
app.listen(4000, () => {
  console.log("listening on 4000");
});
