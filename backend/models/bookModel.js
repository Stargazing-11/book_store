const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  edition: {
    type: Number,
    required: true,
  },

  discription: {
    type: String,
    required: false,
  },
  Category: {
    type: String,
    required: true,
  },
  donated: {
    type: Boolean,
    default: false,
  },
});

bookSchema.statics.validationSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  edition: Joi.number().required(),
  description: Joi.string().allow(""),
  category: Joi.string().required(),
  donated: Joi.boolean().default(false),
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { book, validationSchema };
