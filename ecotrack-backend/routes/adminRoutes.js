import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import {
  getAllReports,
  updateReportStatus,
  getAllPickups,
  updatePickupStatus,
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/reports', protect, admin, getAllReports);
router.put('/reports/:id', protect, admin, updateReportStatus);

router.get('/pickups', protect, admin, getAllPickups);
router.put('/pickups/:id', protect, admin, updatePickupStatus);

export default router;
