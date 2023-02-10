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
 *  description: Tag containing endpoint about of Post Comment
 * */

/**
 * @swagger
 * components:
 *   schemas:
 *    Comments:
 *       type: object
 *       required:
 *         - "name"
 *         - "articleId"
 *         - "comment"
 *       properties:  
 *          name:
 *            type: string
 *            description: User Name
 *          articleId:
 *            type: string
 *            description:  Article id
 *          comment:
 *            type: string
 *            description: It'll be containing User Comment on Article
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * */

/**
 * @swagger
 * /api/Comment/{id}:
 *  get:
 *    summary: Return Comment of a given article!!
 *    tags:
 *    - "Comments"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: To return a specific Article in the list
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200: 
 *        description: Here's our Article 
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Comment" 
 *
*        500:
*          description: Server error
*          content:
*              application/json:
*                schema: 
*                  $ref: "#/components/schemas/error"   
* */

router.get("/Comment/:articleid", getComment);
/**
 * @swagger
 * /api/Comment:
 *  post:
 *    summary: Creating Comment
 *    tags:
 *    - "Comments"
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
 *                 name:
 *                    type: string
 *                    description: This will hold Name
 *                 comment:
 *                    type: string
 *                    description: This will hold Article comment  
 *    responses:
 *        200: 
 *          description: Comment is being created successful
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items: 
 *                        $ref: "#/components/schemas/Articles"
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

export default router;