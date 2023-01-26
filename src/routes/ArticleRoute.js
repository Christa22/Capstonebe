import express from "express";
import bodyParser from "body-parser";
import Userverify from "../Middlewares/Verfication";
import { createArticle,getAllArticles, getArticle,putArticle,deleteArticle } from "../controllers/ArticleController";

const router = express.Router();
router.use(bodyParser.json());


/**
 * @swagger
 * tags:
 *  name: Articles
 *  description: Tag containing all endpoints about articles
 * */

/**
 * @swagger
 * components:
 *   schemas:
 *    Articles:
 *       type: object
 *       required:
 *         - "Title"
 *         - "Topic"
 *         - "articleContents"
 *         - "_id"
 *       properties:
 *          _id:
 *            type: string
 *            description: It is auto genereted    
 *          Title:
 *            type: string
 *            description: Article Title
 *          Topic:
 *            type: string
 *            description:  Here we illustrate the kind of concept we have in our Article
 *          articleContents:
 *            type: string
 *            description: It'll be containing body part of our article
 *    error: 
 *      type: object
 *      properties:
 *        error:
 *          type: string
 * */ 




/**
 * @swagger
 * /api/Article:
 *  post:
 *    summary: Creating comment
 *    tags:
 *    - "Articles"
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
 *                 Title:
 *                    type: string
 *                    description: This takes Title of our article
 *                 Topic:
 *                    type: string
 *                    description: This holds Topic of Article  
 *                 articleContents:
 *                    type: string
 *                    description: This holds the whole body of our article
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

router.post("/Article",Userverify,createArticle);


/**
 * @swagger
 * /api/Article/{id}:
 *  get:
 *    summary: Return single Article on the list by providing its Article id that have been auto-generated!!
 *    tags:
 *    - "Articles"
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
 *                   $ref: "#/components/schemas/Articles" 
 * */

router.get("/Article/:id", getArticle);


/**
 * @swagger
 * /api/Article/{id}:
 *  put:
 *    summary: Updatating The Existing Article
 *    tags:
 *    - "Articles"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: Authorization required
 *        required: true
 *        schema: 
 *          type: string
 *      - name: id
 *        in: path
 *        description : ArticleId required
 *        required: true
 *        scheam: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Title:
 *                    type: string
 *                    description: This takes Title of our article
 *                 Topic:
 *                    type: string
 *                    description: This holds Topic of Article  
 *                 articleContents:
 *                    type: string
 *                    description: This holds the whole body of our article
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







router.put("/Article/:id",Userverify,putArticle);














/**
 * @swagger
 * /api/Article/{id}:
 *  delete:
 *    summary: Deleting an existing Article 
 *    tags:
 *    - "Articles"
 *    parameters:
 *      - name: auth-token
 *        in: header
 *        description: Authorization required
 *        required: true
 *        schema: 
 *          type: string
 *      - name: id
 *        in: path
 *        description : ArticleId required
 *        required: true
 *        scheam: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 Title:
 *                    type: string
 *                    description: This takes Title of our article
 *                 Topic:
 *                    type: string
 *                    description: This holds Topic of Article  
 *                 articleContents:
 *                    type: string
 *                    description: This holds the whole body of our article
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




router.delete("/Article/:id",Userverify,deleteArticle);





/**
 * @swagger
 * /api/Articles:
 *  get:
 *    summary: Return All Articles on the list and you can limit the list using max attributte!!
 *    tags:
 *    - "Articles"
 *    parameters:
 *      - name: max
 *        in: query
 *        description: To return a specific limits of Articles
 *        required: false
 *        schema:
 *          type: integer
 *    responses:
 *      200: 
 *        description: Here's our Article List
 *        content:
 *          application/json:
 *              schema:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/Articles" 
 * */

router.get("/Articles", getAllArticles);

export default router;