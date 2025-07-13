const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;


require("./connection");


app.use(express.json());
app.use(cors());


const BlogModel = require("./model");


app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newBlog = await BlogModel.create({ title, content, img_url });

    
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/blogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.put("/update/:id", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const updated = await BlogModel.findByIdAndUpdate(
      req.params.id,
      { title, content, img_url },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog updated", blog: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating blog" });
  }
});


app.delete("/blogs/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
