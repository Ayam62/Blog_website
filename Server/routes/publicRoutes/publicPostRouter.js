import express from "express"
import { protect } from "../../middlewares/authMiddlwares/auth.middleware.js"
import { getAllDatabasePostsByCategory,getAllDatabasePosts,getAllDatabasePostsById,postCommentsById,getCommentsForPost, getAllDatabaasePostsByTags } from "../../controllers/publicControllers/publicPostController.js"

const publicPostsRouter=express.Router()

publicPostsRouter.get("/",getAllDatabasePosts)

publicPostsRouter.get("/:postId",getAllDatabasePostsById);

publicPostsRouter.get("/category/:name",getAllDatabasePostsByCategory)
publicPostsRouter.get('/tag/:tag',getAllDatabaasePostsByTags)
publicPostsRouter.post("/:postId/comment",protect,postCommentsById)
publicPostsRouter.get("/:postId/comments", protect,getCommentsForPost);

export default publicPostsRouter


