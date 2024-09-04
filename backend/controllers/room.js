import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// Controller for creating a new room and associating it with a hotel
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid; // Get the hotel ID from the request parameters
  const newRoom = new Room(req.body); // Create a new Room instance with the request body

  try {
    const savedRoom = await newRoom.save(); // Save the new room to the database

    try {
      // Update the hotel to include the newly created room's ID
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err); // Pass any errors to the error-handling middleware
    }

    res.status(200).json(savedRoom); // Send the saved room data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for updating an existing room by ID
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update the room with the data from the request body
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedRoom); // Send the updated room data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for deleting a room by ID and removing it from associated hotels
export const deleteRoom = async (req, res, next) => {
  const roomId = req.params.id; // Get the room ID from the request parameters

  try {
    // Step 1: Find all hotels containing the room
    const hotels = await Hotel.find({ rooms: roomId });

    // Step 2: Remove the room from each hotel
    const updatePromises = hotels.map(hotel =>
      Hotel.findByIdAndUpdate(hotel._id, {
        $pull: { rooms: roomId },
      })
    );

    await Promise.all(updatePromises);

    // Step 3: Delete the room
    await Room.findByIdAndDelete(roomId);

    res.status(200).json("Room has been deleted."); // Send a success message as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for getting a specific room by ID
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id); // Find the room by its ID
    res.status(200).json(room); // Send the room data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for getting all rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find(); // Find all rooms in the database
    res.status(200).json(rooms); // Send the list of rooms as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};
