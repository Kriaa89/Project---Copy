import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Workout name is required']
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['Strength', 'Cardio', 'Flexibility', 'HIIT', 'Custom'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  duration: {
    value: Number,
    unit: {
      type: String,
      enum: ['minutes', 'hours'],
      default: 'minutes'
    }
  },
  exercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    externalApiId: String,  // For exercises from external APIs
    name: String,           // Backup in case the exercise is deleted
    sets: Number,
    reps: Number,
    duration: Number,       // For timed exercises (in seconds)
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['kg', 'lbs'],
        default: 'kg'
      }
    },
    restBetweenSets: Number, // Rest time in seconds
    notes: String
  }],
  completedSessions: [{
    date: {
      type: Date,
      default: Date.now
    },
    duration: {
      value: Number,
      unit: {
        type: String,
        enum: ['minutes', 'hours'],
        default: 'minutes'
      }
    },
    feedback: {
      type: String,
      enum: ['Too Easy', 'Just Right', 'Too Hard'],
    },
    notes: String,
    caloriesBurned: Number
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],
  targetMuscleGroups: [String]
}, { timestamps: true });

// Index to optimize queries by user
WorkoutSchema.index({ user: 1, createdAt: -1 });

const Workout = mongoose.model('Workout', WorkoutSchema);
export default Workout;