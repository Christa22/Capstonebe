import Joi from "joi";

const loginValidation = (body)=> {
   const loginSchema = Joi.object({

    Email:Joi.string()
    .min(8)
    .max(30)
    .required(),
    
    Password:Joi.string()
    .min(5)
    .max(25)
    .required(),

   })

   var Valid = loginSchema.validate(body, {abortEarly: false});
   return Valid;  
}
export default loginValidation;