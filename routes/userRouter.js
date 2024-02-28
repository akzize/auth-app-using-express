import express from "express";
import {
	checkUser,
	index,
	login,
	logout,
	saveUser,
	signup,
} from "../controller/authController.js";

import { authMiddleware, redirectIfLoggedIn } from "../middleware/auth.js";

const router = express.Router();

// home
router.get("/", authMiddleware, index);

// signup
router.get("/signup", redirectIfLoggedIn, signup);
router.post("/signup", redirectIfLoggedIn, saveUser);

// login
router.get("/login", redirectIfLoggedIn, login);
router.post("/login", redirectIfLoggedIn, checkUser);

// logout
router.get('/logout', logout)

export default router;
