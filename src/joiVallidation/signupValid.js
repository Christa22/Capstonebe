    import Joi from "joi";
   const signupValidation = (body)=>{

      const signupSchema = Joi.object({
        Name: Joi.string()
        .min(4)
        .max(50)
        .required(),
        Email: Joi.string()
        .email()
        .required(),
        Password: Joi.string()
        .min(8)
        .required(),
      });
    
      var Valid = signupSchema.validate(body, {abortEarly: false});
      return Valid;
      
    }
    export default signupValidation;