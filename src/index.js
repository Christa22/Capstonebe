import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import contactRoute from "./routes/contactRoute.js";
import ArticleRoute from "./routes/ArticleRoute";
import loginRoute from "./routes/loginRoute.js";
import SignupRoute from "./routes/SignupRoute.js";
import CommentsRoute from "./routes/CommentsRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express';
import dotenv, { config } from 'dotenv';
 dotenv.config()
const app = express();
app.use(cors());
const PORT = 5500;
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"capstone",
            version: "1.0.1"
        },
        server:[{
            url: `http://localhost:${PORT}`,
        }],
    },
    apis:["./routes/*.js"]
}

const specs = swaggerJSDoc(options);
app.use("/api/doc", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api",contactRoute);
app.use("/api",ArticleRoute);
app.use("/api",loginRoute);
app.use("/api",SignupRoute);
app.use("/api",CommentsRoute);

app.use("/", (req, res) =>{
    res.send({"message":"Welcome on Christa's api"});
})

const databaseConnection = () =>{

    try{
        const options = {
            w: 'majority',
            j: true,
            wtimeout: 10000
          };
        mongoose.connect(process.env.DATABASE,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            ...options
        
        }).then(() =>{
            console.log("Database connected successfully!!");
        })

    }catch(error){
        console.log("Db failed to connnect... ", error);
    }

}



app.listen(PORT, ()=>{
    console.log("Server running on port ", PORT);
    // mongoose.set('strictQuery', true);
    databaseConnection();
    
});
