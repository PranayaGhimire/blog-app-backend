import Post from "../models/Post.js"

export const getPosts = async(req,res) => {
    try {
        const posts = await Post.find();
        res.status(201).json({
            success:true,
            message:"All posts fetched successfully",
            data:posts
        });      
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}

export const getPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post)
            return res.status(400).json({message:"Post not found"});
        res.status(201).json({
            success:true,
            message:"Post fetched successfully",
            data:post
        })     
    } catch (error) {
        res.status(500).json({message:error})
    }  
}

export const createPost = async(req,res) => {
    const {title,description} = req.body;
    const userId = req.user._id;
    try {
        const post = await Post.create({
            title,
            description,
            user:userId
        });
        res.status(201).json({
            success:true,
            message:"New post created successfully",
            data:post
        })   
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const updatePost = async(req,res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id);
        if(!post)
            return res.status(400).json({message:"Post not found"});
        res.status(201).json({
            success:true,
            message:"Post updated successfully",
            data:post
        });   
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const deletePost = async(req,res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post)
            return res.status(400).json({message:"Post not found"});
        res.status(201).json({
            success:true,
            message:"Post deleted successfully"
        });   
    } catch (error) {
        res.status(500).json({message:error})
    }
}