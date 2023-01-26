import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { createLogin } from "../controllers/loginController";

const router = express.Router();
router.use(bodyParser.json());

router.post("/Login",createLogin);



export default router;