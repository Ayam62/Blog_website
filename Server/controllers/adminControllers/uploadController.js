import cloudinary from '../../configs/cloudinary.js';
import streamifier from 'streamifier';



export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });//this is made in the format of req.file by multer

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blog-uploads" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    res.json({
      imageUrl: result.secure_url,
      publicId: result.public_id
    });

  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
};


// Delete image from Cloudinary
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
};


