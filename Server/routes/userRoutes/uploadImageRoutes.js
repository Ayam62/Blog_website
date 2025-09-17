import express from "express"
import dotenv from "dotenv"
import { deleteImage,uploadImage } from "../../controllers/adminControllers/uploadController.js";
import upload from "../../middlewares/adminMiddlwares/multer.js";
import { protect } from "../../middlewares/authMiddlwares/auth.middleware.js";

const uploadRouter=express.Router();

uploadRouter.use(protect)

uploadRouter.post("/upload",upload.single('image'), uploadImage)
uploadRouter.delete("/delete/:publicId",deleteImage)


export default uploadRouter