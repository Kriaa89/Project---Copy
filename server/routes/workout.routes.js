import { Router } from 'express';
import {
  createWorkout,
  getUserWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  logCompletedWorkout,
  generateTailoredWorkout,
  getWorkoutStatistics
} from '../controller/workout.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// All workout routes require authentication
router.use(authMiddleware);

// Workout routes
router.post('/', createWorkout);
router.get('/', getUserWorkouts);
router.get('/statistics', getWorkoutStatistics);
router.post('/generate', generateTailoredWorkout);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);
router.post('/:id/complete', logCompletedWorkout);

export default router;