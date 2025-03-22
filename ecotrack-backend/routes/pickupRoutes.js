import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { schedulePickup, getUserPickups } from '../controllers/pickupController.js';

const router = express.Router();

router.post('/', protect, schedulePickup);
router.get('/', protect, getUserPickups);

export default router;
