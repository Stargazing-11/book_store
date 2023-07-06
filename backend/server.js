const express = require("express");
const mongoose = require("mongoose");
const book = require("./routes/bookRoute");
const shoppingCart = require("./routes/cartRoute");
const user = require("./routes/userRoute");
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect("mongodb://localhost/book_store")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("Couldn't connect to mongodb", err));

const app = express();

// app use
app.use(express.json());
app.use("/api/books", book);
app.use("/api/shoppingcarts", shoppingCart);
app.use("/api/user", user);
app.use(function (err, req, res, next) {
  return res.status(500).send({ message: "Sth went wrong", error: err });
});

app.listen(port, console.log(`started listening on port ${port}`));
