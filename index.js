import Express from "express";
import mongoose, { Schema } from "mongoose";

const app = Express();
const PORT = process.env.PORT || 5000;

app.use(Express.urlencoded({ extended: true }));

const blogSchema = new Schema({
  title: { type: String, required: true },
  content: String,
});

const Blog = mongoose.model("blog", blogSchema);

//Retrieve a list of all blog posts.
app.get("/api/blogposts", async (req, res) => {
  const data = await Blog.find({});
  res.send(data);
});

//Retrieve a specific blog post by its ID.
app.get("/api/blogposts/:id", async (req, res) => {
  const blogpost = await Blog.findById(req.params.id);
  res.send(blogpost);
});

//Create a new blog post.
app.post("/api/blogposts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newBlog = new Blog({ title, content });
    await newBlog.save();
    res.json(newBlog);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//Update an existing blog post.
app.put("/api/blogposts/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const foundBlog = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    await foundBlog.save();
    const updatedBlog = await Blog.findById(req.params.id);
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//Delete a blog post.
app.delete("/api/blogposts/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.send("Blogpost deleted successfully");
});

async function startServer() {
  await mongoose.connect("mongodb://127.0.0.1:27017/plazaPostDB");
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
}

startServer();
