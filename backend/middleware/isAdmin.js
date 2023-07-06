module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    // User is not an admin, return an error or redirect to an unauthorized page
    res.status(403).json({ message: "Unauthorized" });
  }
};
