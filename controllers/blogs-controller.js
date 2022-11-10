
import mongoose from "mongoose"
import Blog from "../model/BlogPost.js"
import User from "../model/User.js"


export const getAllPosts = async (req, res, nxt) => {
    let posts
    try {
        posts = await Blog.find().populate('user')
    } catch (error) {
        return console.log(error)
    }
    if (posts) {
        return res.status(200).json({ posts: posts })

    }
    return res.status(404).join({ message: "No Posts" })

}

export const addBlog = async (req, res, nxt) => {
    const { title, content, image, user } = req.body
    let existingUser
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error)
    }
    if (!existingUser) {
        return res.status(404).json({ message: "Unauthorize access" })

    }
    const newBlog = new Blog({
        title,
        content,
        image,
        user,
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session })
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session })
        await session.commitTransaction()


    } catch (error) {
        return  res.status(404).join({ message: error })


    }
    if (newBlog) {
        return res.status(200).json({ message: 'blog created successfully' })
    }
    return res.status(404).join({ message: "Got some error" })

}


export const updateBlog = async (req, res, nxt) => {
    const blogId = req.params.id
    // const newBlogId = mongoose.Types.ObjectId(blogId)
    
    console.log(typeof(blogId))
    const { title, content , image } = req.body
    let post
    try {
        post = await Blog.findByIdAndUpdate(blogId , {
            title ,
            content ,
            image
        })
    } catch (error) {
        return  res.status(404).json({ message: error , post })

    }
    if (post) {

        return res.status(200).json({ message: 'blog updated successfully', post })
    }
    return res.status(404).json({ message: "Got some error",post })
}


export const deleteBlog = async (req, res, nxt) => {
    const id = req.params.id
    // const user = req.body
    console.log(id)
    let blog;
    try {
        blog = await Blog.findOneAndRemove(id).populate('user')
        // console.log(blog)
        await blog.user.blogs.pull(blog.id)
        // console.log(blog.user.blogs.pull(blog))
        await blog.user.save()
    } catch (error) {
        return console.log(error)
    }
    if (!blog) {
        return res.status(500).json({ message: 'Unable to delete blog' })

    }
    return res.status(200).json({ message: 'blog deleted successfully' })

}


export const getById = async (req, res, nxt) => {
    const blogId = req.params.id
    let post
    try {
        post = await Blog.findById(blogId)
    } catch (error) {
        return console.log(error)

    }
    if (post) {
        return res.status(200).json({ post })
    }
    return res.status(404).json({ message: "no blog here " })
}


export const getByUser = async (req, res, nxt)=>{
    const userId = req.params.id
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blogs')
    } catch (error) {
        return console.log(error)
        
    }
    if (!userBlogs){
    return res.status(404).json({ message: "no blog here "})

    }
    return res.status(200).json({blogs:userBlogs})
}