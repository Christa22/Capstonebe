import mongoose from "mongoose";
import "mongoose-type-url";

const CommentSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxLength: 200,
    },
    articleId: {
        type: String,
        required: true,
        maxLength: 200,
      },
     comment: {
        type: String,
        required: true,
        maxLength: 500,
      },
});
export default mongoose.model("Comment",CommentSchema)