import { Router } from 'express';
import { 
  searchExercisesFromAPI,
  getTargetMuscles,
  getEquipmentList,
  getExerciseById,
  saveExercise,
  createCustomExercise,
  getUserExercises
} from '../controller/exercise.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// Public routes - accessible without authentication
router.get('/api/search', searchExercisesFromAPI);
router.get('/api/targets', getTargetMuscles);
router.get('/api/equipment', getEquipmentList);
router.get('/api/:id', getExerciseById);

// Protected routes - require authentication
router.use(authMiddleware);
router.post('/save', saveExercise);
router.post('/custom', createCustomExercise);
router.get('/', getUserExercises);

export default router;