import express from "express";
import bodyParser from "body-parser";
import mongoose  from "mongoose";
import { createSignup, getUser } from "../controllers/SignupController";
import Userverify from "../Middlewares/Verfication";

const router = express.Router();
router.use(bodyParser.json());

/**
 * @swagger
 * tags:
 *  name: Signup
 *  description: Tag containing User Signup
 * */



/**
 * @swagger
 * components:
 *   schemas:
 *    Signup:
 *       type: object
 *       required:
 *         - "Name"
 *         - "Email"
 *         - "Passwword"
 *       properties:
 *          Name:
 *            type: string
 *            description: The name of the user   
 *          Email:
 *            type: string
 *            description: User Email
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
 * /api/Signup:
 *  post:
 *    summary: Signup
 *    tags:
 *    - "Signup"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: Authorization required
 *        required: true
 *        schema: 
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Name:
 *                    type: string
 *                    description: This will take the name 
 *                 Email:
 *                    type: string
 *                    description: This will hold The email of the user 
 *                 Password:
 *                    type: string
 *                    description: This will  hold the password
 *    responses:
 *        200: 
 *          description: Successfully created a new user
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Signup"
 *        400:
 *          description: Invalid inputs
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





router.post("/Signup",Userverify,createSignup);


/**
 * @swagger
 * /api/Signup:
 *  get:
 *    summary: Get User Details
 *    tags:
 *    - "Signup"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: Authorization required
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *        200: 
 *          description: Successful retrieval of user details
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Signup"
 *        400:
 *          description: Invalid request
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Unauthorized
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
 */

router.get("/Signup",Userverify ,getUser);


export default router;