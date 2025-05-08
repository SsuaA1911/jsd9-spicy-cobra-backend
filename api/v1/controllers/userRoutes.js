import express from "express";
import { authUser } from "../../../middleware/auth.js";
import { profileUser, register, } from "./userController.js";


const router = express.Router();

router.post("/register",register);


router.get("/profile",authUser,profileUser);

export default router;