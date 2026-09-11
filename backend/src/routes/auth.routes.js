const { Router } = require("express");


const register = require("../controllers/auth/register.controller");
const login = require("../controllers/auth/login.controller");
const logout = require("../controllers/auth/logout.controller");
const profile = require("../controllers/auth/profile.controller");


const auth = require("../middlewares/auth.middleware");

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

router.get("/profile", auth, profile);

module.exports = router;
