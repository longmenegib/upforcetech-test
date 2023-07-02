import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true
  },
},
{
  timestamps: true
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);