import Article from "../models/articleModel";
 import articleValidation from "../joiVallidation/articleValid.js";
const createArticle = async(req, res) =>{
    var {error} = articleValidation(req.body);
    console.log("erros", articleValidation(req.body));
    if(error){
        return res.status(400).send({"Bad Request":error.details[0].message});
    }
    try{
  
  const blog = new Article({
        Title :req.body.Title,
        Topic: req.body.Topic,
        articleContents: req.body.articleContents,
        image:req.body.image
    })

     const SavedBlog =  await blog.save();
     return res.status(200).send(SavedBlog);
    }
    catch(error){
        // you can add a console of the error (to debug later)
        res.status(500).json({"message":error});
    }
}

const getAllArticles =  async(req, res) =>{
    try{
    var max = req.query.max;

   var fetchArticle = await Article.find({}).limit(max);

   return res.status(200).json({'Data':fetchArticle});
   
    }
    catch(error){
        res.send({"message":"error happened! sorry"});
    }
}

const getArticle =  async(req, res) =>{
    try{

    var id = req.params.id
        var getSingleArticle = await Article.find({_id:id});

        res.send({'data':getSingleArticle});

    }catch(error){
        res.send({"message":"error happened! sorry"});
    }
}
// Update

const putArticle = async(req,res) =>{
    try{

    var id = req.params.id;
       var updateArticle = await Article.findOneAndUpdate({_id:id},
        { $set:{
        Title :req.body.Title,
        Topic: req.body.Topic,
        articleContents: req.body.articleContents}});
        
        res.send({"message":"Data has been Updated!!"});
       
    }catch(error){
       res.send({"message":"error happened! sorry"});
    }
}

//delete

const deleteArticle = async(req,res) =>{
    try{

        var id =req.params.id;
        var deleteArticle = await Article.deleteOne({_id:id});

        if(deleteArticle.deletedCount == 1){
          return res.status(200).send({"message":"The Article has been deleted!"});
        }else{
            return res.status(404).send({"error":"The Article does not exit!"})
        } 

    }catch(error){
       return res.status(500).send({"Error":"error happened! sorry"});
    }
}
export {createArticle, getAllArticles,getArticle,putArticle,deleteArticle};