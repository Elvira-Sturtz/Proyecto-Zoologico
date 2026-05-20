const { Router } = require("express");

const {
  register,
  login,
  logout,
  profile,
} = require("../controllers/auth.controller");

const auth = require("../middlewares/auth.middleware");

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

router.get("/profile", auth, profile);

module.exports = router;
