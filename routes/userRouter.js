import express from "express";
import {
	index,
	login,
	saveUser,
	signup,
} from "../controller/authController.js";

const router = express.Router();

router.get("/", index);

// signup
router.get("/signup", signup);
router.post("/signup", saveUser);

// login
router.get("/login", login);

export default router;
