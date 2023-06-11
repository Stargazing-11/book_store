const express = require("express");
const mongoose = require("mongoose");
const book = require("./routes/bookRoute");
const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost/book_store")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Couldn't connect to mongodb", err));

const app = express();

// app use
app.use(express.json());
app.use("api/books", book);

app.listen(PORT, console.log(`started listening on port ${PORT}`));