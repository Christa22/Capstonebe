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
 *         - "Comment"
 *       properties:  
 *          name:
 *            type: string
 *            description: User Name
 *          articleId:
 *            type: string
 *            description:  Article id
 *          Comment:
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
 *      - name: id
 *        in: path
 *        description : articleId required
 *        required: true
 *        scheam: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 name:
 *                    type: string
 *                    description: This User Name
 *                articleId:
 *                    articleId: string
 *                    description: This holds Article Id  
 *                 Comments:
 *                    type: string
 *                    description: This holds User Comment
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
 *                        $ref: "#/components/schemas/Comments"
 *        400:
 *          description:  Bad Request or Invalid input
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Internal Server Error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"   
 * */
router.post("/Comment",createComments);

router.get("/Comment/:articleid", getComment);



export default router;