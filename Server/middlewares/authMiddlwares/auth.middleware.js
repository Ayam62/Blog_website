

import jwt from 'jsonwebtoken';
import User from "../../models/authModel/userModel.js";
import asyncHandler from 'express-async-handler';



export const protect =asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log(token)
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           // console.log(decoded)
            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            //console.log(req.user)
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
  })



