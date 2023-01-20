import Joi from "joi";

const articleValidation = (body)=> {
   const articleSchema = Joi.object({

    Title:Joi.string()
    .alphanum()
    .min(8)
    .max(10)
    .required(),
    
    Topic:Joi.string()
    .alphanum()
    .min(5)
    .max(25)
    .required(),

    articleContents:Joi.string()
    .alphanum()
    .min(30)
    .max(100)
    .required(),
   })

   var Valid = articleSchema.validate(body);
   return Valid;
   
}
export default articleValidation;