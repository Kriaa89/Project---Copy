import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: 'Please enter a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  age: {
    type: Number,
    min: [13, 'User must be at least 13 years old'],
    max: [120, 'Please enter a valid age']
  },
  height: {
    value: { type: Number },
    unit: { 
      type: String, 
      enum: ['cm', 'inches'], 
      default: 'cm' 
    }
  },
  fitnessLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  fitnessGoals: [{
    type: String,
    enum: ['Weight Loss', 'Muscle Gain', 'Endurance', 'Strength', 'Flexibility', 'General Fitness']
  }],
  availableEquipment: [{
    type: String
  }],
  bodyType: {
    type: String,
    enum: ['Ectomorph', 'Mesomorph', 'Endomorph']
  },
  smartwatchConnected: {
    type: Boolean,
    default: false
  },
  smartwatchType: {
    type: String,
    enum: ['None', 'Apple Watch', 'Fitbit', 'Garmin', 'Other'],
    default: 'None'
  }
}, { timestamps: true });

// Middleware to hash the password before saving
UserSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      next(error);
    }
  }
  next();
});

// Method to validate password for login
UserSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;