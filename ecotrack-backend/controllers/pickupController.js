// controllers/pickupController.js
import Pickup from '../models/Pickup.js';
import { io } from '../server.js';

// Schedule a pickup
export const schedulePickup = async (req, res) => {
  const { pickupDate, pickupTime, location } = req.body;

  try {
    const pickup = new Pickup({
      user: req.user._id,
      pickupDate,
      pickupTime,
      location,
    });

    await pickup.save();
    io.emit('newPickup', { message: 'New pickup request scheduled', pickup });

    res.status(201).json({ message: 'Pickup scheduled successfully', pickup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all pickups for a user
export const getUserPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ user: req.user._id });
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
