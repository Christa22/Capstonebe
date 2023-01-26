import mongoose from "mongoose";
import "mongoose-type-url";

const SignupSchema = mongoose.Schema({
  Name: {
        type: String,
        required: true,
        maxLength: 200
      },
  Email: {
    type: String,
    required: true,
    maxLength: 255,
  },
 Password: {
    type: String,
    required: true,
    maxLength:100
  },


});
export default mongoose.model("Signup", SignupSchema);
