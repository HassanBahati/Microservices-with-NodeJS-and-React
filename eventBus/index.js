// import  modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

// create new app as instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

//post request handler to watch for incoming events
//make request to necessary endpoints
app.post("/events", (req, res) => {
  const event = req.body;

  //make requests to relative services that need to be notified
  //once a post request is emmited, send an event to 1.postService, 2.commentsService, 3.eventBus
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);

  //send status sucessful
  res.send({ status: "OK" });
});

// app to listen on port 4005
app.listen(4005, () => {
  console.log("event bus listening on 4005");
});
