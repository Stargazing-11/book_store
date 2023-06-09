const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/book_store")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Couldn't connect to mongodb", err));

const app = express();

// app use
app.use(express.json())

