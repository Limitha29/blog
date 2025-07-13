
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  img_url:  { type: String, required: false },
}, {
  timestamps: true
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = BlogModel;