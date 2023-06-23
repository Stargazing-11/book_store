const { Book, findError } = require("../models/bookModel.js");

// Add new book if the same book with the same edition doesn't exist
async function addBook(req, res) {
  const { title, edition } = req.body;
  // try to extract the existing book,
  const existingBook = await Book.findOne({ title, edition });

  if (existingBook) {
    existingBook.amount += req.body.amount;
    existingBook = await existingBook.save();
    return res.status(201).send(existingBook);
  }

  if (!findError(req.body)) {
    let book = Book(req.body);

    book = (await book.save());
    return res.status(201).send(book);
  }
  return res.status(422).send({ message: findError(req.body) });
}

// Get all books,
async function getBooks(req, res) {
  try {
    const books = await Book.find();
    return res.status(200).send(books);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

// Get book By Id
async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not Found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

// search book by title, author or description
async function searchBooks(req, res) {
  const { query } = req.query;

  try {
    // Perform a case-insensitive search for books matching the query
    const books = await Book.find({
      $or: [
        { title: { $regex: "^" + "\\b" + query + "$", $options: "i" } },
        { author: { $regex: "^" + "\\b" + query + "$", $options: "i" } },
        { description: { $regex: "^" + "\\b" + query + "$", $options: "i" } },
      ],
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error("Error searching for books:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getBooksByAuthor(req, res) {
  const { author } = req.params;
  try {
    const books = await Book.find({ author });
    return res.status(200).send(books);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function getBooksByGenre(req, res) {
  const { genre } = req.params;
  try {
    const books = await Book.find({ genre });
    return res.status(200).send(books);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = {
  addBook,
  getBooks,
  getBookById,
  getBooksByAuthor,
  searchBooks,
  getBooksByGenre,
};
