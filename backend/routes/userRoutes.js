import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getUser, login, logout, register, updatePassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

router.put('/update-password', isAuthenticated, updatePassword);


export default router;