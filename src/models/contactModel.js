import mongoose from "mongoose";
import "mongoose-type-url";

const contactSchema = mongoose.Schema({
  Email: {
    type: String,
    required: true,
    maxLength: 255,
  },
 Subject: {
    type: String,
    required: true,
  },

Message: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Contact", contactSchema);
