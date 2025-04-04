import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['Citizen', 'WasteCollector', 'Admin'],
    default: 'Citizen',
  },
}, { timestamps: true });

// Password Hashing Middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password Match Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the Model
const User = mongoose.model('User', userSchema);
export default User;
