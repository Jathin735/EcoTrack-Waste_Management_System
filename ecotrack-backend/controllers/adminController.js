import Report from '../models/Report.js';
import Pickup from '../models/Pickup.js';
import User from '../models/User.js';

// Get all reports (Admin Only)
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('user', 'name email');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update report status
export const updateReportStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    report.status = status;
    await report.save();

    res.json({ message: 'Report status updated successfully', report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all pickups (Admin Only)
export const getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find().populate('user', 'name email');
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pickup status
export const updatePickupStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const pickup = await Pickup.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });

    pickup.status = status;
    await pickup.save();

    res.json({ message: 'Pickup status updated successfully', pickup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
