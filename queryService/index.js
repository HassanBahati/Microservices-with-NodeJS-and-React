// import  modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create new app as instance of express
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req,res)=>{

})


app.post("/events", (req, res) => {
  const event = req.body;

  //send status sucessful
  res.send({ status: "OK" });
});

// app to listen on port 4005
app.listen(4002, () => {
  console.log("query service listening on 4002");
});
