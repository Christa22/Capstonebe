import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import contactRoute from "./routes/contactRoute.js";
import ArticleRoute from "./routes/ArticleRoute";
import loginRoute from "./routes/loginRoute.js";
import SignupRoute from "./routes/SignupRoute.js";
import CommentsRoute from "./routes/CommentsRoute.js";

const app = express();
app.use(cors());
const PORT = 5500;

app.use("/api",contactRoute);
app.use("/api",ArticleRoute);
app.use("/api",loginRoute);
app.use("/api",SignupRoute);
app.use("/api",CommentsRoute);

app.use("/", (req, res) =>{
    res.send({"message":"Welcome on Christa's api"});
})

const databaseConnection = () =>{
    const dataBase = "mongodb+srv://Christa:Benigne99@cluster0.zf5qla4.mongodb.net/?retryWrites=true&w=majority";
    try{
        mongoose.connect(dataBase,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
        
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
