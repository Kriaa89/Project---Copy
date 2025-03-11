import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EXERCISE_DB_API_KEY = process.env.EXERCISE_DB_API_KEY;
const EXERCISE_DB_BASE_URL = 'https://exercisedb.p.rapidapi.com';

const exerciseDbClient = axios.create({
  baseURL: EXERCISE_DB_BASE_URL,
  headers: {
    'X-RapidAPI-Key': EXERCISE_DB_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
});

// Get all exercises
export const getAllExercises = async () => {
  try {
    const response = await exerciseDbClient.get('/exercises');
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises from ExerciseDB:', error);
    throw new Error('Failed to fetch exercises from external API');
  }
};

// Get exercise by ID
export const getExerciseById = async (id) => {
  try {
    const response = await exerciseDbClient.get(`/exercises/exercise/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercise with ID ${id} from ExerciseDB:`, error);
    throw new Error('Failed to fetch exercise details from external API');
  }
};

// Get exercises by target muscle
export const getExercisesByMuscle = async (muscle) => {
  try {
    const response = await exerciseDbClient.get(`/exercises/target/${muscle}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercises for muscle ${muscle} from ExerciseDB:`, error);
    throw new Error('Failed to fetch muscle-specific exercises from external API');
  }
};

// Get exercises by equipment
export const getExercisesByEquipment = async (equipment) => {
  try {
    const response = await exerciseDbClient.get(`/exercises/equipment/${equipment}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercises for equipment ${equipment} from ExerciseDB:`, error);
    throw new Error('Failed to fetch equipment-specific exercises from external API');
  }
};

// Search exercises
export const searchExercises = async (name) => {
  try {
    const response = await exerciseDbClient.get(`/exercises/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching exercises with name ${name} from ExerciseDB:`, error);
    throw new Error('Failed to search exercises from external API');
  }
};

// Get all available target muscles
export const getAllTargetMuscles = async () => {
  try {
    const response = await exerciseDbClient.get('/exercises/targetList');
    return response.data;
  } catch (error) {
    console.error('Error fetching target muscle list from ExerciseDB:', error);
    throw new Error('Failed to fetch target muscles from external API');
  }
};

// Get all available equipment
export const getAllEquipment = async () => {
  try {
    const response = await exerciseDbClient.get('/exercises/equipmentList');
    return response.data;
  } catch (error) {
    console.error('Error fetching equipment list from ExerciseDB:', error);
    throw new Error('Failed to fetch equipment list from external API');
  }
};