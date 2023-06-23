const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  edition: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);

function findError(book) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    edition: Joi.number().required(),
    tags: Joi.array().items(Joi.string()),
    description: Joi.string().allow(""),
    genre: Joi.string().required(),
    price: Joi.number().required(),
    coverImage: Joi.string(),
    amount: Joi.number(),
  });

  const { error, value } = schema.validate(book);
  return error;
}

module.exports = { Book, findError };
