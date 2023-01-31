import Signup from "../models/SignupModel";
import bcrypt, { hash } from "bcrypt";
import signupValidation from "../joiVallidation/signupValid";
const createSignup = async(req, res) =>{

    var {error} = signupValidation(req.body);
    console.log("erros", signupValidation(req.body));
    if(error){
        return res.status(401).send({"Unauthorized":error.details[0].message});
    }
    try{
      
        var email = req.body.Email;
        var getEmail = await Signup.findOne({Email:email});

         if(getEmail){
            res.status(500).send({"Internal Server Error":"User already exist!!"});
         }else{
             var Password = req.body.Password;
           var Salt =  await bcrypt.genSalt(8);
           var hash = await bcrypt.hash(Password,Salt);
           console.log(hash);
      
              const enrollin = new Signup({
                   Name:req.body.Name,
                  Email:req.body.Email,
                  Password:hash
               
              })
      
              const SavedUser = await enrollin.save();
             
              res.send(SavedUser);
         }


    }catch(error){
        // you can add a console of the error (to debug later)
        res.status(500).json({"Internal Server Error":error});
    }
}

const getUser = async (req, res) =>{
    try{

       var max  = req.query.max;
       var fetchUser = await Signup.find({}).limit(max);

        res.send(fetchUser);
    }catch(error){
        res.send({"message":"error happened! sorry"});
    }
}


export {createSignup,getUser};