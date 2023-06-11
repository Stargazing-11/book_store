const { Book, validationSchema } = require("../models/bookModel.js");

async function addBook(req, res) {
  const { title, edition } = req.body;

  try {
    // Check if a book with the same title and edition already exists
    const existingBook = await Book.findOne({ title, edition });

    if (existingBook) {
      return res.status(409).json({ error: "Book already exists" });
    }

    // Create a new book using the request body
    const newBook = new Book(req.body);
    await newBook.save();

    // Book added successfully
    return res
      .status(201)
      .json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addBook,
};
