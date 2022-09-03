// import express
const express = require("express");

// create new app as instance of express
const app = express();

// get request
app.get("/posts", (req, res) => {});

//post request
app.post("/posts", (req, res) => {});

// app to listen on port 4000
app.listen(4000, () => {
  console.log("listening on 4000");
});
