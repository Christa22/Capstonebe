import mongoose from "mongoose";
import "mongoose-type-url";

const articleSchema = mongoose.Schema({
  Title: {
    type: String,
    required: [true,'Please Enter a Title'],
    maxLength: 35,
  },
 Topic: {
    type: String,
    required: [true,'Provide a Topic'],
    maxLength:25
  },/*
  Image: {
    type:mongoose.SchemaTypes.Url,
    required: true,
  },*/
 articleContents: {
    type: String,
    required: [true,'Please Provide The Content'],
    maxLength:500,
  },
});
export default mongoose.model("Article", articleSchema);
