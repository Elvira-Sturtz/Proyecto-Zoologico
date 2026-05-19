const { Router } = require("express");

const { register, login, logout } = require("../controllers/auth.controller");

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

module.exports = router;
