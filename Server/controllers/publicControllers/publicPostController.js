import Blog from "../../models/userModel/postSchema.js";

export const getAllDatabasePosts = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts from database:", error);
    res.status(500).json({ error: "Failed to retrieve blog posts" });
  }
};


export const getAllDatabasePostsById=async(req,res)=>{
    try{
        const {id}=req.params
        if (!id) {
                return res.status(400).json({ error: "Category is required" });
            }
        const blog=await Blog.findById(id);
        if(!blog){
            return res.status(404).json({error:"No blog of this id found"})
        }
        res.status(200).json(blog);

    }catch(error){
        console.log("Error fetching posts by Id")
        res.status(500).json({error:"Failed to retreive posts by Id"})
    }
}


export const getAllDatabasePostsByCategory=async (req,res)=>{
    try{
        const {category}=req.params
        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        } 
        const posts= await Blog.find({category:category}) 
        if (posts.length===0){
            res.status(404).json({message:"No posts of this category avialable"})
        }
        res.status(200).json(posts)

    }catch(error){
        console.log("Error fetching post by category")
        res.status(500).json({error:"Failed to retrieve posts by catrgory"})
    }
}
export const getAllDatabaasePostsByTags=async(req,res)=>{
    try {
    const tag = req.params.tag;
    const posts = await Blog.find({ tags: tag }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error filtering by tag:", error);
    res.status(500).json({ error: "Failed to fetch posts by tag" });
}
}

export const postCommentsById=async(req,res)=>{
    try{
        const { postId } = req.params;
        const {comment}=req.body;
        if (!comment || comment.trim() === "") {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }
        const blog = await Blog.findById(postId);

        if (!blog) {
            return res.status(404).json({ error: "Blog post not found" });
        }
        const newComment={
            user:req.user_id,
            comment:comment
        }
        blog.comments.push(newComment)
        await blog.save()

        res.status(200).json({message:"Comment added successfully",comment:newComment})

    }catch(error){
        console.log("Error posting comment")
        res.status(500).json({error:"Error putting comments"})
    }

}

export const getCommentsForPost=async(req,res)=>{
    try{
        const { postId } = req.params;
        const blogComments = await Blog.findById(postId).select("comments")
        if(!blogComments){
            return res.status(404).json({message:"No comments found"})
        }
        res.status(200).json({ comments:blogComments.comments });
    }catch(error){
        console.log("Error fetching comments");
        res.status(500).json({error:"Error fetching comments"})
    }
}
