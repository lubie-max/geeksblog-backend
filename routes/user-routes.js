import express from "express";
import { getAllUsers, loginUser, signup } from "../controllers/user-controller.js";

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers)
userRoutes.post('/signup', signup)
userRoutes.post('/login', loginUser )


export default userRoutes;