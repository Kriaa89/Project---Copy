import { Router } from 'express';
import {
  addWeightLog,
  getUserWeightLogs,
  getWeightLogById,
  updateWeightLog,
  deleteWeightLog,
  getWeightStatistics
} from '../controller/weightLog.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Weight log routes
router.post('/', addWeightLog);
router.get('/', getUserWeightLogs);
router.get('/statistics', getWeightStatistics);
router.get('/:id', getWeightLogById);
router.put('/:id', updateWeightLog);
router.delete('/:id', deleteWeightLog);

export default router;