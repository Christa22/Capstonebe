import Signup from "../models/SignupModel"
import bcrypt, { hash } from "bcrypt";
import  Jwt from "jsonwebtoken";
import loginValidation from "../joiVallidation/loginValid";
const createLogin = async(req, res) =>{

  var {error} =loginValidation(req.body);
  console.log("erros",loginValidation(req.body));
  if(error){
      return res.status(401).send({"Unauthorized":error.details[0].message});
  }
    try{

      var email = req.body.Email;
      var getExistingUser = await Signup.findOne({Email:email});

      var Password= req.body.Password
      var CorrectPassword = await bcrypt.compare(Password,getExistingUser.Password);
      
      console.log(CorrectPassword);
 
         if(CorrectPassword){
         var TokenData = { 
            Email:req.body.Email,
            id: getExistingUser._id,
            Name: getExistingUser.Name

         }
        var token = Jwt.sign(TokenData,"decode");

        
      res.status(200).send({"token":token,"message":"Logedin successful"});

         }
         else{
       res.status(401).send({"error":"Please Provide the right information"});
         }
         
       
    }catch(error){
        // you can add a console of the error (to debug later)
        res.status(500).send({"error":error});
    }
}

export {createLogin};