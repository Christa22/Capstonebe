import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";


import {createComments, getComment } from "../controllers/CommentsController";

const router = express.Router();
router.use(bodyParser.json()); 
router.post("/Comment",createComments);

router.get("/Comment/:articleid", getComment);



export default router;