import Exercise from '../model/exercise.model.js';
import * as ExerciseDbService from '../services/exerciseDb.service.js';

// Fetch and search exercises from ExerciseDB API
export const searchExercisesFromAPI = async (req, res) => {
  try {
    const { query, muscle, equipment } = req.query;
    let exercises = [];
    
    if (query) {
      // Search by name
      exercises = await ExerciseDbService.searchExercises(query);
    } else if (muscle) {
      // Filter by muscle group
      exercises = await ExerciseDbService.getExercisesByMuscle(muscle);
    } else if (equipment) {
      // Filter by equipment
      exercises = await ExerciseDbService.getExercisesByEquipment(equipment);
    } else {
      // Get all exercises (limit results to avoid overwhelming response)
      const allExercises = await ExerciseDbService.getAllExercises();
      exercises = allExercises.slice(0, 20); // Return first 20 only
    }
    
    res.status(200).json({
      success: true,
      count: exercises.length,
      exercises
    });
  } catch (error) {
    console.error('Error searching exercises from API:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exercises from external API',
      error: error.message
    });
  }
};

// Get available target muscles from API
export const getTargetMuscles = async (req, res) => {
  try {
    const muscles = await ExerciseDbService.getAllTargetMuscles();
    
    res.status(200).json({
      success: true,
      count: muscles.length,
      muscles
    });
  } catch (error) {
    console.error('Error fetching target muscles:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching target muscles',
      error: error.message
    });
  }
};

// Get available equipment from API
export const getEquipmentList = async (req, res) => {
  try {
    const equipmentList = await ExerciseDbService.getAllEquipment();
    
    res.status(200).json({
      success: true,
      count: equipmentList.length,
      equipment: equipmentList
    });
  } catch (error) {
    console.error('Error fetching equipment list:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching equipment list',
      error: error.message
    });
  }
};

// Get exercise details by ID from API
export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = await ExerciseDbService.getExerciseById(id);
    
    res.status(200).json({
      success: true,
      exercise
    });
  } catch (error) {
    console.error(`Error fetching exercise with ID ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exercise details',
      error: error.message
    });
  }
};

// Save exercise to local database
export const saveExercise = async (req, res) => {
  try {
    const userId = req.userId;
    const { externalApiId } = req.body;
    
    // Check if exercise already exists
    let exercise = await Exercise.findOne({ externalApiId });
    
    if (exercise) {
      return res.status(200).json({
        success: true,
        message: 'Exercise already saved',
        exercise
      });
    }
    
    // Fetch exercise details from API
    const exerciseData = await ExerciseDbService.getExerciseById(externalApiId);
    
    // Map API exercise data to our model
    const newExercise = new Exercise({
      name: exerciseData.name,
      externalApiId: externalApiId,
      description: exerciseData.instructions?.join('. '),
      muscleGroup: exerciseData.target,
      secondaryMuscles: exerciseData.secondaryMuscles,
      equipment: exerciseData.equipment,
      difficulty: mapDifficulty(exerciseData),
      instructions: exerciseData.instructions?.join('. '),
      imageUrl: exerciseData.gifUrl,
      isCustom: false,
      createdBy: userId
    });
    
    await newExercise.save();
    
    res.status(201).json({
      success: true,
      message: 'Exercise saved successfully',
      exercise: newExercise
    });
  } catch (error) {
    console.error('Error saving exercise:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving exercise',
      error: error.message
    });
  }
};

// Create custom exercise
export const createCustomExercise = async (req, res) => {
  try {
    const userId = req.userId;
    
    const exercise = new Exercise({
      ...req.body,
      isCustom: true,
      createdBy: userId
    });
    
    await exercise.save();
    
    res.status(201).json({
      success: true,
      message: 'Custom exercise created successfully',
      exercise
    });
  } catch (error) {
    console.error('Error creating custom exercise:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating custom exercise',
      error: error.message
    });
  }
};

// Get all saved exercises for user
export const getUserExercises = async (req, res) => {
  try {
    const userId = req.userId;
    const { muscleGroup, equipment } = req.query;
    
    const query = {};
    
    if (muscleGroup) {
      query.muscleGroup = muscleGroup;
    }
    
    if (equipment) {
      query.equipment = equipment;
    }
    
    const exercises = await Exercise.find({
      $or: [
        { createdBy: userId, isCustom: true }, // Custom exercises created by the user
        { isCustom: false } // Exercises from API (available to all users)
      ],
      ...query
    }).sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: exercises.length,
      exercises
    });
  } catch (error) {
    console.error('Error fetching user exercises:', error);
    res.status(400).json({
      success: false,
      message: 'Error fetching exercises',
      error: error.message
    });
  }
};

// Helper function to map difficulty based on exercise data
const mapDifficulty = (exerciseData) => {
  // This is a simple mapping logic, can be refined based on actual data
  // Since ExerciseDB API might not provide difficulty, we'll use a simple heuristic
  if (exerciseData.equipment === 'body weight') {
    return 'Beginner';
  } else if (exerciseData.equipment === 'dumbbell' || exerciseData.equipment === 'cable') {
    return 'Intermediate';
  } else {
    return 'Advanced';
  }
};