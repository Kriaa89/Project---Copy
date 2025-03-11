import mongoose from 'mongoose';

const WeightLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weight: {
    value: {
      type: Number,
      required: [true, 'Weight value is required']
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    }
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  measuredAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index to optimize queries by user and date
WeightLogSchema.index({ user: 1, measuredAt: -1 });

const WeightLog = mongoose.model('WeightLog', WeightLogSchema);
export default WeightLog;