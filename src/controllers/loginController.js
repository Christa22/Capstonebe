import Signup from "../models/SignupModel"
import bcrypt, { hash } from "bcrypt";
import  Jwt from "jsonwebtoken";

const createLogin = async(req, res) =>{
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
           res.send({"message":"Please Provide the right Password"});
         }
         
       
    }catch(error){
        // you can add a console of the error (to debug later)
        res.status(500).send({"message":error});
    }
}

export {createLogin};