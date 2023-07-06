const jwt = require("jsonwebtoken");
const config = require("../config.js");

module.exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
