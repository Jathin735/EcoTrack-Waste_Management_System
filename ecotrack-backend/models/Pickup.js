import mongoose from 'mongoose';

const pickupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pickupDate: {
    type: String,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Canceled'],
    default: 'Scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Pickup', pickupSchema);
