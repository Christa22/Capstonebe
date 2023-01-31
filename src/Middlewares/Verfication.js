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
            res.status(401).send({"Unauthorized":"Access denied"});
        }
        
    }else{
        res.status(401).send({"Unauthorized":"Access denied!!"});
    }

}catch(error){
 res.status(500).send({"Internal Server Error":"error happened"});
}

}
export default Userverify;