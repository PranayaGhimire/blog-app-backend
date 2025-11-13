import Post from "../models/Post.js"

export const getPosts = async(req,res) => {
    const posts = await Post.find();
    return res.status(201).json({
        success:true,
        message:"All posts fetched successfully",
        data:posts
    });   
}

export const getPost = async(req,res) => {
    const post = await Post.findById(req.params.id);
    if(!post)
        return res.status(400).json({message:"Post not found"});
    return res.status(201).json({
        success:true,
        message:"Post fetched successfully",
        data:post
    })    
}

export const createPost = async(req,res) => {
    const post = await Post.create(req.body);
    return res.status(201).json({
        success:true,
        message:"New post created successfully",
        data:post
    })
}

export const updatePost = async(req,res) => {
    const post = await Post.findByIdAndUpdate(req.params.id);
    if(!post)
        return res.status(400).json({message:"Post not found"});
    return res.status(201).json({
        success:true,
        message:"Post updated successfully",
        data:post
    });
}

export const deletePost = async(req,res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if(!post)
        return res.status(400).json({message:"Post not found"});
    return res.status(201).json({
        success:true,
        message:"Post deleted successfully"
    });
}