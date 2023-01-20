import express from "express";
import bodyParser from "body-parser";
import Userverify from "../Middlewares/Verfication";
import { createArticle,getAllArticles, getArticle,putArticle,deleteArticle } from "../controllers/ArticleController";

const router = express.Router();
router.use(bodyParser.json());

router.post("/Article",Userverify,createArticle);
router.get("/Article/:id", getArticle);
router.put("/Article/:id",Userverify,putArticle);
router.delete("/Article/:id",Userverify,deleteArticle);
router.get("/Articles", getAllArticles);

export default router;