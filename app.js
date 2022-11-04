require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const { ConnectDb } = require("./config/mongoDb");

const mongoose = require("mongoose");

const SERVER_PORT = process.env.PORT;

// import modules
const { authRouter } = require("./routes");

// Routes
app.get("/", (req, res) => {
  console.log("home route");
  res.send("Home Route");
});

// Authentication Routes
app.use("/auth", authRouter);

// Error Handling Middleware
// console.log(process.versions);
app.use((error, req, res, next) => {
  res.send(error.message, error.status);
});

// checking mongo status
if (mongoose.STATES[mongoose.connection.readyState] === "disconnected") {
  ConnectDb()
    .then((res) => {
      app.listen(SERVER_PORT, () => {
        console.log(`listening on port ${SERVER_PORT} `);
      });
    })
    .catch((err) => {
      console.log("failed to connect ...", err.message);
    });
}
