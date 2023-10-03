// .env import
require("dotenv").config();

// import express
const express = require("express");

// import routes
const routes = require("./routes/routes");

// import mongoose
const mongoose = require("mongoose");

// express app
const app = express();

// app middleware
app.use(express.json()); //for the update and delete to send and recieve data

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/movies", routes);

// connect to db by mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests once connected to the database
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
