
import dotenv from "dotenv"
import express from "express"
import uploadRouter from "./routes/userRoutes/uploadImageRoutes.js";
import connectDB from "./configs/db.js";
import postRouter from "./routes/userRoutes/postRoutes.js";
import authRouter from "./routes/authRoutes/authRouter.js";
import userRouter from "./routes/userRoutes/userRoute.js";
import publicPostsRouter from "./routes/publicRoutes/publicPostRouter.js"
import cors from "cors"

dotenv.config();

const app=express();
const PORT= process.env.PORT || 8000

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  credentials: true
}));

//routes for admin
app.use("/api/auth",authRouter)
app.use("/api/uploads",uploadRouter)
app.use("/api/posts",postRouter)
app.use("/api/user", userRouter)
app.use("/api/public/posts",publicPostsRouter)


//mongodb connection function call
connectDB();

app.get("/",(req,res)=>{
    res.send("Hello world")
})


//listening to port
module.exports = app;





