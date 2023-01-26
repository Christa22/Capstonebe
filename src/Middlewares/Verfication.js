import Jwt, { decode } from "jsonwebtoken";
const Userverify = async(req,res,next)=>{

try{
    var Token = req.header("auth-token");
    if(Token){
        var Verified = Jwt.verify(Token,"decode");
        req.user = Verified;

        console.log(Verified);
        if(Verified.Email){
            next();
        }else{
            res.status(401).send({"message":"Access denied"});
        }
        
    }else{
        res.status(401).send({"message":"Access denied!!"});
    }

}catch(error){
 res.status(500).send({"message":"error happened"});
}

}
export default Userverify;