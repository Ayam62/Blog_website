import express from 'express';
import { protect } from '../../middlewares/authMiddlwares/auth.middleware.js';
import { getCurrentUser, updateUser,deleteUser } from '../../controllers/adminControllers/userController.js';

const userRouter = express.Router();

userRouter.use(protect)

userRouter.get('/current',getCurrentUser);
userRouter.put('/update',updateUser);
userRouter.delete('/delete',deleteUser);
export default userRouter;