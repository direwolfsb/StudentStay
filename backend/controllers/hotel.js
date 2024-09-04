import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Controller for creating a new hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body); // Create a new Hotel instance with the request body

  try {
    const savedHotel = await newHotel.save(); // Save the new hotel to the database
    res.status(200).json(savedHotel); // Send the saved hotel data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for updating an existing hotel
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update the hotel with the data from the request body
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedHotel); // Send the updated hotel data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for deleting a hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id); // Delete the hotel by its ID
    res.status(200).json("Hotel has been deleted"); // Send a success message as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for getting a specific hotel by ID
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // Find the hotel by its ID
    res.status(200).json(hotel); // Send the hotel data as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for getting a list of hotels with optional filters
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query; // Extract min and max price filters and other query parameters
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 999 }, // Apply price range filters
    }).limit(req.query.limit); // Limit the number of results
    res.status(200).json(hotels); // Send the list of hotels as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for counting hotels by city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(","); // Split the cities query parameter into an array
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city }); // Count the number of hotels in each city
      })
    );
    res.status(200).json(list); // Send the list of counts as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

// Controller for getting all rooms of a specific hotel
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id); // Find the hotel by its ID
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room); // Find each room by its ID
      })
    );
    res.status(200).json(list); // Send the list of rooms as the response
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};
