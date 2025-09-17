
import express from 'express';
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from '../../controllers/authControllers/authController.js'


const authRouter = express.Router();

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)
authRouter.post('/forgot-password',forgotPassword)
authRouter.post('/reset-password', resetPassword)


export default authRouter;
