import User from "../models/User.js";

// Controller for creating a new user
export const createUser = async (req, res, next) => {
  const newUser = new User(req.body); // Create a new User instance with the request body

  try {
    const savedUser = await newUser.save(); // Save the new user to the database
    res.status(200).json(savedUser); // Send the saved user data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for updating an existing user by ID
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update the user with the data from the request body
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedUser); // Send the updated user data as the response
  } catch (err) {
    res.status(500).json(err); // Send a 500 error response if something goes wrong
  }
};

// Controller for deleting a user by ID
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id); // Delete the user by its ID
    res.status(200).json("User has been deleted"); // Send a success message as the response
  } catch (err) {
    res.status(500).json(err); // Send a 500 error response if something goes wrong
  }
};

// Controller for getting a specific user by ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); // Find the user by its ID
    res.status(200).json(user); // Send the user data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for getting all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Find all users in the database
    res.status(200).json(users); // Send the list of users as the response
  } catch (err) {
    res.status(500).json(err); // Send a 500 error response if something goes wrong
  }
};
