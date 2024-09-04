import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

// Middleware to verify if the request contains a valid JWT token
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; // Get the token from the cookies
    if (!token) {
        // If no token is found, return an unauthorized error
        return next(createError(401, "You are not authorized"));
    }
    // Verify the token using the secret key
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            // If token verification fails, return a forbidden error
            return next(createError(403, "Token is not valid"));
        }
        // Attach the user information to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
};

// Middleware to verify if the user is authorized to access the resource
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if the user ID matches the ID in the request parameters or if the user is an admin
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next(); // User is authorized, proceed to the next middleware or route handler
        } else {
            // If user is not authorized, return a forbidden error
            return next(createError(403, "You are not authorized"));
        }
    });
};

// Middleware to verify if the user is an admin
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Check if the user is an admin
        if (req.user.isAdmin) {
            next(); // User is an admin, proceed to the next middleware or route handler
        } else {
            // If user is not an admin, return a forbidden error
            return next(createError(403, "You are not authorized"));
        }
    });
};
