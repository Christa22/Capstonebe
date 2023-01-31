import Joi from "joi";

const contactValidation = (body)=> {
   const contactSchema = Joi.object({

    Email:Joi.string()
    .min(8)
    .max(50)
    .required(),
    
    Subject:Joi.string()
    .min(5)
    .max(25)
    .required(),

    Message:Joi.string()
    .min(30)
    .max(100)
    .required(),
   })

   var Valid = contactSchema.validate(body, {abortEarly: false});
   return Valid;
   
}
export default contactValidation;