import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import { createReport, getUserReports } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), createReport);
router.get('/', protect, getUserReports);

export default router;
