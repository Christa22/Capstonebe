import Joi from "joi";

const articleValidation = (body)=> {
   const articleSchema = Joi.object({

    Title:Joi.string()
    .min(8)
    .max(50)
    .required(),
    
    Topic:Joi.string()
    .min(5)
    .max(25)
    .required(),

    articleContents:Joi.string()
    .min(30)
    .max(100)
    .required(),

   image:Joi.string()
   .min(30)
   .max(100)
   .required(),
  })

   var Valid = articleSchema.validate(body, {abortEarly: false});
   return Valid;
   
}
export default articleValidation;