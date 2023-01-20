import mongoose from "mongoose";
import "mongoose-type-url";

const loginSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    maxLength: 255,
  },
  Password: {
    type: String,
    required: true,
  },


});
export default mongoose.model("Login", loginSchema);
