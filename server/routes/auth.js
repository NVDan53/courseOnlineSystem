import express from "express";
import { register, login, logout, currentUser } from "../controllers/auth";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
