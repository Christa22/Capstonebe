import express from "express";
import bodyParser from "body-parser";
import Userverify from "../Middlewares/Verfication";
import mongoose  from "mongoose";
import { createContact, getContacts, getsingleContact } from "../controllers/contactController";

const router = express.Router();
router.use(bodyParser.json());

/**
 * @swagger
 * components:
 *   schemas:
 *    Contact:
 *       type: object
 *       required:
 *         - "Message"
 *         - "Email"
 *         - "Subject"
 *       properties:
 *          _id:
 *            type: string
 *            description: It is auto genereted    
 *          Message:
 *            type: string
 *            description: This is holds the one who is commenting
 *          Email:
 *            type: string
 *            description: This is holds user email
 *          Subject:
 *            type: string
 *            description: This is holds the subject
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * */ 

/**
 * @swagger
 * tags:
 *  name: Contact
 *  description: Contacting api
 * 
 * */ 


/**
 * @swagger
 * /api/Contact:
 *  get:
 *    summary: Returns list of queries
 *    tags:
 *    - "Contact"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: To return a spacific limits of messages sent
 *        required: false
 *        schema:
 *          type: string
 *      - name: max
 *        in: query
 *        description: max of message to return
 *        required: false
 *        schema: 
 *          type: string
 *    responses:
 *      200: 
 *        description: This is list users who Contacted and there messages
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                    data:
 *                      type: array
 *                      items:
 *                         $ref: "#/components/schemas/Contact"   
 *      404:
 *        description: No contacts found
 *        content:
 *          application/json:
 *              schema:
 *                $ref: "#/components/schemas/error"  
 *      500:
 *        description: Server error
 *        content:
 *          application/json:
 *              schema:
 *                $ref: "#/components/schemas/error"  
 *           
 *  
 * */ 

router.post("/contact",createContact);
router.get("/contact",Userverify, getContacts);
router.get("/contact/:id",Userverify, getsingleContact);

export default router;