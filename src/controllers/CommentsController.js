import Comment from "../models/CommentsModel"
import commentValidation from "../joiVallidation/commentValid.js";
const createComments = async(req, res) =>{
    var {error} = commentValidation(req.body);
    console.log("erros", commentValidation(req.body));
    if(error){
        return res.status(401).send({"Unauthorized":error.details[0].message});
    }
    try{
    
    const Comments = new Comment({
          name :req.body.name,
          articleId:req.query.blogId,
          comment:req.body.comment
      })
       const SavedComment =  await Comments.save();
       
       res.send(SavedComment);
      }
      catch(error){
          // you can add a console of the error (to debug later)
          res.status(500).json({"message":error});
      }
  }
  const getComment = async (req, res) =>{
    try{
       var id = req.params.articleid;
      
       var CatchComment = await Comment.find({articleId:id});
        if(CatchComment.length == 0){
            return res.send({"message":"no comments yet!!"})
        }
        res.send(CatchComment);
    }catch(error){
        res.send({"message":"error happenedddd! sorry"});
    }
}
export{createComments,getComment};