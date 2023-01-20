import express from "express";
import bodyParser from "body-parser";
import Userverify from "../Middlewares/Verfication";
import mongoose  from "mongoose";
import { createContact, getContacts, getsingleContact } from "../controllers/contactController";

const router = express.Router();
router.use(bodyParser.json());

router.post("/contact",createContact);
router.get("/contact",Userverify, getContacts);
router.get("/contact/:id",Userverify, getsingleContact);

export default router;