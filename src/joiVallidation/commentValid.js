import Joi from "joi";

const commentValidation = (body)=> {
   const commentSchema = Joi.object({

    name:Joi.string()
    .min(4)
    .max(50)
    .required(),
    comment:Joi.string()
    .min(30)
    .max(100)
    .required(),
   })

   var Valid = commentSchema.validate(body, {abortEarly: false});
   return Valid;
   
}
export default commentValidation;