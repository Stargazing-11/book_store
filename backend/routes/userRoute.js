const { Router } = require("express");
const router = Router();

const { errorHandler } = require("../utils/errorHandler");
const { registerUser, login } = require("../controllers/userController");

router.post("/register", errorHandler(registerUser));
router.post("/login", (login));

module.exports = router;
