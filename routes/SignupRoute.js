import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import { createSignup, getUser } from "../controllers/SignupController";
import Userverify from "../Middlewares/Verfication";

const router = express.Router();
router.use(bodyParser.json());

router.post("/Signup",Userverify,createSignup);
router.get("/Signup",Userverify ,getUser);


export default router;