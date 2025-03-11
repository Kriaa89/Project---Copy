import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true
  },
  externalApiId: {
    type: String,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  muscleGroup: {
    type: String,
    enum: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Abs', 'Legs', 'Glutes', 'Calves', 'Full Body', 'Cardio', 'Other'],
    required: true
  },
  secondaryMuscles: [{
    type: String
  }],
  equipment: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  instructions: {
    type: String
  },
  imageUrl: {
    type: String
  },
  videoUrl: {
    type: String
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Compound index for better search performance
ExerciseSchema.index({ muscleGroup: 1, equipment: 1 });
ExerciseSchema.index({ name: 'text', description: 'text' });

const Exercise = mongoose.model('Exercise', ExerciseSchema);
export default Exercise;