const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  photoUrl: {
    type: String,
  },

  email: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Admin", "user"],
    default: "user",
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      email: this.email,
    },
    process.env.JWTPRIVATEKEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function findError(user) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    photoUrl: Joi.string(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("Admin", "user").default("user"),
  });

  const { error, value } = schema.validate(user);
  return error;
}

module.exports = { User, findError };
