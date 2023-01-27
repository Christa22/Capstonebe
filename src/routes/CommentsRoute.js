import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";


import {createComments, getComment } from "../controllers/CommentsController";

const router = express.Router();
router.use(bodyParser.json());

/**
 * @swagger
 * tags:
 *  name: Comments
 *  description: Tag containing all endpoints about Comments
 * */

/**
 * @swagger
 * components:
 *   schemas:
 *    Comment:
 *       type: object
 *       required:
 *         - "name"
 *         - "comment"
 *       properties:
 *          name:
 *            type: string
 *            description: Name of person who's making comment   
 *          comment:
 *            type: string
 *            description: It'll hold article comment
 *
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * */ 




/**
 * @swagger
 * /api/Comment:
 *  post:
 *    summary: Creating Comment
 *    tags:
 *    - "Comments"
 *    parameters:
 *      - name: id
 *        in: path
 *        description : ArticleId required
 *        required: true
 *        scheam: string
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
 *                name:
 *                    type: string
 *                    description: This holds name of commenting user
 *                 comment:
 *                    type: string
 *                    description: This holds the comment of Article  
 *    responses:
 *        200: 
 *          description: Contanct sent response
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Comments"
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"   
 * */
router.post("/Comment",createComments);




/**
 * @swagger
 * /api/Comment/{id}:
 *  get:
 *    summary: Return single Comment on the list by providing its Article id that have been auto-generated!!
 *    tags:
 *    - "Comments"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: To return a specific  Comment of an Article in the list
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200: 
 *        description: Here's our Article Comment 
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Comments" 
 * */


router.get("/Comment/:articleid", getComment);



export default router;