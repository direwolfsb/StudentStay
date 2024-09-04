import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

// User registration function
export const register = async (req, res, next) => {
    try {
        // Generate a salt and hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create a new user instance with the hashed password
        const newUser = new User({
            ...req.body,
            password: hash, // Store the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(200).send("User has been created");
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
};

// User login function
export const login = async (req, res, next) => {
    try {
        // Find the user by username
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found."));

        // Compare the provided password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Incorrect password"));

        // Generate a JWT token with the user's ID and admin status
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        // Exclude sensitive fields like password and admin status from the response
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Set the JWT as a cookie and send a response with user details and admin status
        res.cookie("access_token", token, {
            httpOnly: true, // Secure the cookie by making it accessible only via HTTP (not JavaScript)
        }).status(200).json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err); // Pass the error to the error-handling middleware
    }
};
