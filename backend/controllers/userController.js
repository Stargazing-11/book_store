const { User, findError } = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const dotenv = require("dotenv");

dotenv.config();

// register User
async function registerUser(req, res) {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  if (!findError(req.body)) {
    let user = User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    return res.status(201).send(user);
  }
  return res.status(422).json({ message: findError(req.body) });
}

// login
async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_PRIVATE_KEY
  );

  return res.header("Authorization", "Bearer " + token).status(200).send(_.pick(['firstName', 'lastName', 'role']));
}

module.exports = {
  registerUser,
  login,
};
