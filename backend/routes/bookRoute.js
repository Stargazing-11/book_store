const { Router } = require("express");
const router = Router();
const { validationSchema } = require("../models/bookModel.js");
const { validateData } = require("../middleware/error.js");
const { addBook } = require("../controllers/bookController.js");

router.post("/addBook", validateData(validationSchema), addBook);

module.exports = router;
