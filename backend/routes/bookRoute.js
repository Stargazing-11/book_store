const { Router } = require("express");
const router = Router();
const { errorHandler } = require("../utils/errorHandler");
const { authMiddleware } = require("../middleware/auth");
const { isAdmin } = require("../middleware/isAdmin");
const {
  addBook,
  getBooks,
  getBookById,
  getBooksByAuthor,
  getBooksByGenre,
  searchBooks,
} = require("../controllers/bookController.js");

router.post("/", errorHandler(addBook));
router.get("/", authMiddleware, errorHandler(getBooks));
router.get("/getBookById:id", authMiddleware, errorHandler(getBookById));
router.get("/genres/:genre", authMiddleware, errorHandler(getBooksByGenre));
router.get("/author/:bookAuthor", authMiddleware, errorHandler(getBooksByAuthor));
router.get("/search/", authMiddleware, errorHandler(searchBooks));

module.exports = router;
