import express from "express";
import  {deleteBlog, getAllPosts, addBlog, updateBlog, getById, getByUser}  from "../controllers/blogs-controller.js";


const blogRoutes = express.Router() ;

blogRoutes.get("/", getAllPosts)
blogRoutes.post("/new-blog", addBlog)
blogRoutes.put("/update/:id", updateBlog)
blogRoutes.delete("/delete/:id", deleteBlog)
blogRoutes.get("/:id", getById)
blogRoutes.get("/user/:id", getByUser)

export default blogRoutes ;