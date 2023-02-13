import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { createLogin } from "../controllers/loginController";

const router = express.Router();
router.use(bodyParser.json());
/**
 * @swagger
 * components:
 *   schemas:
 *    Login:
 *       type: object
 *       required:
 *         - "Email"
 *         - "Password"
 *       properties:
 *          Email:
 *            type: string
 *            description: The email of the user   
 *          Password:
 *            type: string
 *            description:  The password of the user
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * */ 

/**
 * @swagger
 * /api/Login:
 *  post:
 *    summary: Login
 *    tags:
 *    - "Login"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Email:
 *                    type: string
 *                    description: This will hold the email of the user
 *                 Password:
 *                    type: string
 *                    description: This will hold the password of the user
 *    responses:
 *        200: 
 *          description: Successful login
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Login"
 *        400:
 *          description: Invalid email or password
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Internal Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"   
 * */

router.post("/Login",createLogin);



export default router;