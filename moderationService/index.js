// import  modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create new app as instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/events", (req, res) => {
  
  //send status sucessful
  res.send({ status: "OK" });
});

// app to listen on port 4003
app.listen(4003, () => {
  console.log("moderation service listening on 4003");
});
