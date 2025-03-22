// controllers/reportController.js
import Report from '../models/Report.js';
import { io } from '../server.js';
import cloudinary from '../config/cloudinary.js';
import upload from '../middleware/uploadMiddleware.js';

// Create a new report with image upload
export const createReport = async (req, res) => {
  const { description, location } = req.body;

  try {
    let imageUrl = '';

    if (req.file) {
      await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream({ folder: 'ecotrack_reports' }, (error, result) => {
          if (error) return reject(error);
          imageUrl = result.secure_url;
          resolve();
        }).end(req.file.buffer);
      });
    }

    const report = new Report({
      user: req.user._id,
      description,
      location,
      image: imageUrl,
    });

    await report.save();
    io.emit('newReport', { message: 'New waste report submitted', report });

    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reports for a user
export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
