import Workout from '../model/workout.model.js';
import User from '../model/user.model.js';

// Create a new workout
export const createWorkout = async (req, res) => {
  try {
    const userId = req.userId;
    
    const workout = new Workout({
      ...req.body,
      user: userId
    });
    
    await workout.save();
    
    res.status(201).json({
      success: true,
      message: 'Workout created successfully',
      workout
    });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating workout',
      error: error.message
    });
  }
};

// Get all workouts for a user
export const getUserWorkouts = async (req, res) => {
  try {
    const userId = req.userId;
    const { type, difficulty, isActive } = req.query;
    
    // Build query
    const query = { user: userId };
    
    if (type) {
      query.type = type;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const workouts = await Workout.find(query)
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(400).json({
      success: false,
      message: 'Error fetching workouts',
      error: error.message
    });
  }
};

// Get workout by ID
export const getWorkoutById = async (req, res) => {
  try {
    const userId = req.userId;
    const workoutId = req.params.id;
    
    const workout = await Workout.findOne({
      _id: workoutId,
      user: userId
    });
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    res.status(200).json({
      success: true,
      workout
    });
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(400).json({
      success: false,
      message: 'Error fetching workout',
      error: error.message
    });
  }
};

// Update a workout
export const updateWorkout = async (req, res) => {
  try {
    const userId = req.userId;
    const workoutId = req.params.id;
    
    const workout = await Workout.findOneAndUpdate(
      {
        _id: workoutId,
        user: userId
      },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Workout updated successfully',
      workout
    });
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating workout',
      error: error.message
    });
  }
};

// Delete a workout
export const deleteWorkout = async (req, res) => {
  try {
    const userId = req.userId;
    const workoutId = req.params.id;
    
    const workout = await Workout.findOneAndDelete({
      _id: workoutId,
      user: userId
    });
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(400).json({
      success: false,
      message: 'Error deleting workout',
      error: error.message
    });
  }
};

// Log a completed workout session
export const logCompletedWorkout = async (req, res) => {
  try {
    const userId = req.userId;
    const workoutId = req.params.id;
    const sessionData = req.body;
    
    const workout = await Workout.findOne({
      _id: workoutId,
      user: userId
    });
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    // Add completed session to workout
    workout.completedSessions.push(sessionData);
    await workout.save();
    
    res.status(200).json({
      success: true,
      message: 'Workout session logged successfully',
      workout
    });
  } catch (error) {
    console.error('Error logging workout session:', error);
    res.status(400).json({
      success: false,
      message: 'Error logging workout session',
      error: error.message
    });
  }
};

// Generate a tailored workout plan based on user profile
export const generateTailoredWorkout = async (req, res) => {
  try {
    const userId = req.userId;
    const { goal, duration, preferredDays, excludedExercises } = req.body;
    
    // Get user profile data
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get user's fitness level, body type, and equipment
    const { fitnessLevel, bodyType, availableEquipment = [] } = user;
    
    // Template workout plans based on fitness level and goal
    let workoutTemplate;
    
    // This is a simplified algorithm - in a real app, you'd have a more sophisticated generator
    // or potentially use AI to create personalized plans
    if (goal === 'Weight Loss') {
      workoutTemplate = generateWeightLossWorkout(fitnessLevel, bodyType, availableEquipment, duration, preferredDays);
    } else if (goal === 'Muscle Gain') {
      workoutTemplate = generateMuscleGainWorkout(fitnessLevel, bodyType, availableEquipment, duration, preferredDays);
    } else if (goal === 'Endurance') {
      workoutTemplate = generateEnduranceWorkout(fitnessLevel, bodyType, availableEquipment, duration, preferredDays);
    } else {
      workoutTemplate = generateGeneralFitnessWorkout(fitnessLevel, bodyType, availableEquipment, duration, preferredDays);
    }
    
    // Remove any excluded exercises if specified
    if (excludedExercises && excludedExercises.length > 0) {
      workoutTemplate.exercises = workoutTemplate.exercises.filter(
        exercise => !excludedExercises.includes(exercise.name)
      );
    }
    
    // Create the tailored workout
    const tailoredWorkout = new Workout({
      user: userId,
      name: `${goal} Plan`,
      description: `Custom ${goal.toLowerCase()} workout plan for ${fitnessLevel.toLowerCase()} fitness level`,
      type: mapGoalToWorkoutType(goal),
      difficulty: fitnessLevel,
      duration: {
        value: duration,
        unit: 'minutes'
      },
      exercises: workoutTemplate.exercises,
      isActive: true,
      tags: [goal, fitnessLevel, bodyType],
      targetMuscleGroups: workoutTemplate.targetMuscleGroups
    });
    
    await tailoredWorkout.save();
    
    res.status(201).json({
      success: true,
      message: 'Tailored workout plan generated successfully',
      workout: tailoredWorkout
    });
  } catch (error) {
    console.error('Error generating tailored workout:', error);
    res.status(400).json({
      success: false,
      message: 'Error generating tailored workout',
      error: error.message
    });
  }
};

// Get workout statistics
export const getWorkoutStatistics = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Count total workouts
    const totalWorkouts = await Workout.countDocuments({ user: userId });
    
    // Count completed sessions
    const workouts = await Workout.find({ user: userId });
    let totalSessions = 0;
    let totalDuration = 0;
    
    workouts.forEach(workout => {
      totalSessions += workout.completedSessions.length;
      
      // Sum up duration of all completed sessions
      workout.completedSessions.forEach(session => {
        if (session.duration) {
          const durationValue = session.duration.value || 0;
          const durationMultiplier = session.duration.unit === 'hours' ? 60 : 1;
          totalDuration += durationValue * durationMultiplier; // Convert to minutes
        }
      });
    });
    
    // Get counts by workout type
    const workoutsByType = await Workout.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    // Get most recent workout
    const recentWorkout = await Workout.findOne({ user: userId })
      .sort({ 'completedSessions.date': -1 })
      .select('name type difficulty completedSessions');
    
    res.status(200).json({
      success: true,
      statistics: {
        totalWorkouts,
        totalSessions,
        totalDurationMinutes: totalDuration,
        workoutsByType: workoutsByType.map(item => ({
          type: item._id,
          count: item.count
        })),
        recentWorkout: recentWorkout ? {
          name: recentWorkout.name,
          type: recentWorkout.type,
          difficulty: recentWorkout.difficulty,
          lastCompleted: recentWorkout.completedSessions.length > 0 
            ? recentWorkout.completedSessions[recentWorkout.completedSessions.length - 1].date 
            : null
        } : null
      }
    });
  } catch (error) {
    console.error('Error fetching workout statistics:', error);
    res.status(400).json({
      success: false,
      message: 'Error fetching workout statistics',
      error: error.message
    });
  }
};

// Helper functions for workout generation
const generateWeightLossWorkout = (fitnessLevel, bodyType, equipment, duration, preferredDays) => {
  // In a real app, this would be a more sophisticated algorithm
  // This is just a placeholder example
  return {
    exercises: [
      {
        name: 'Jumping Jacks',
        sets: 3,
        reps: fitnessLevel === 'Beginner' ? 10 : fitnessLevel === 'Intermediate' ? 15 : 20,
        duration: 60,
        restBetweenSets: 30
      },
      {
        name: 'Mountain Climbers',
        sets: 3,
        reps: fitnessLevel === 'Beginner' ? 8 : fitnessLevel === 'Intermediate' ? 12 : 15,
        duration: 45,
        restBetweenSets: 30
      },
      {
        name: 'Burpees',
        sets: 3,
        reps: fitnessLevel === 'Beginner' ? 5 : fitnessLevel === 'Intermediate' ? 10 : 15,
        duration: 60,
        restBetweenSets: 45
      }
    ],
    targetMuscleGroups: ['Full Body', 'Cardio']
  };
};

const generateMuscleGainWorkout = (fitnessLevel, bodyType, equipment, duration, preferredDays) => {
  // Sample logic for a muscle gain workout
  return {
    exercises: [
      {
        name: 'Push-Ups',
        sets: 4,
        reps: fitnessLevel === 'Beginner' ? 8 : fitnessLevel === 'Intermediate' ? 12 : 15,
        restBetweenSets: 60
      },
      {
        name: 'Dumbbell Bicep Curls',
        sets: 3,
        reps: 10,
        weight: { value: fitnessLevel === 'Beginner' ? 5 : fitnessLevel === 'Intermediate' ? 10 : 15, unit: 'kg' },
        restBetweenSets: 60
      },
      {
        name: 'Squats',
        sets: 3,
        reps: fitnessLevel === 'Beginner' ? 10 : fitnessLevel === 'Intermediate' ? 15 : 20,
        restBetweenSets: 90
      }
    ],
    targetMuscleGroups: ['Chest', 'Biceps', 'Legs']
  };
};

const generateEnduranceWorkout = (fitnessLevel, bodyType, equipment, duration, preferredDays) => {
  // Sample logic for an endurance workout
  return {
    exercises: [
      {
        name: 'Jogging in Place',
        duration: 300,
        restBetweenSets: 60
      },
      {
        name: 'Jumping Rope',
        duration: 180,
        restBetweenSets: 60
      },
      {
        name: 'High Knees',
        duration: 120,
        restBetweenSets: 30
      }
    ],
    targetMuscleGroups: ['Cardio', 'Full Body']
  };
};

const generateGeneralFitnessWorkout = (fitnessLevel, bodyType, equipment, duration, preferredDays) => {
  // Sample logic for a general fitness workout
  return {
    exercises: [
      {
        name: 'Push-Ups',
        sets: 3,
        reps: fitnessLevel === 'Beginner' ? 8 : fitnessLevel === 'Intermediate' ? 10 : 12,
        restBetweenSets: 45
      },
      {
        name: 'Sit-Ups',
        sets: 3,
        reps: fitnessLevel === 'Beginner' ? 10 : fitnessLevel === 'Intermediate' ? 15 : 20,
        restBetweenSets: 30
      },
      {
        name: 'Lunges',
        sets: 3,
        reps: fitnessLevel === 'Beginner' ? 6 : fitnessLevel === 'Intermediate' ? 8 : 10,
        restBetweenSets: 45
      },
      {
        name: 'Plank',
        duration: fitnessLevel === 'Beginner' ? 30 : fitnessLevel === 'Intermediate' ? 45 : 60,
        restBetweenSets: 30
      }
    ],
    targetMuscleGroups: ['Chest', 'Abs', 'Legs', 'Core']
  };
};

const mapGoalToWorkoutType = (goal) => {
  switch (goal) {
    case 'Weight Loss':
      return 'Cardio';
    case 'Muscle Gain':
      return 'Strength';
    case 'Endurance':
      return 'HIIT';
    case 'Flexibility':
      return 'Flexibility';
    default:
      return 'Custom';
  }
};