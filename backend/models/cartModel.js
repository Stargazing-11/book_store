const mongoose = require("mongoose");
const Joi = require("joi");

const shoppingCartSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const ShopingCart = mongoose.model("ShopingCart", shoppingCartSchema);

async function findError(shoppingCart) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    items: Joi.array()
      .items(
        Joi.object({
          bookId: Joi.string().required(),
          amount: Joi.number().required(),
        })
      )
      .required(),
  });
  const { error, value } = schema.validate(shopingCart);
  return error;
}

module.exports = { ShopingCart, findError };
