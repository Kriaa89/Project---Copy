import { Router } from 'express';
import {
  connectSmartwatch,
  disconnectSmartwatch,
  syncSmartwatch,
  getSmartwatchStatus
} from '../controller/smartwatch.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Smartwatch routes
router.get('/status', getSmartwatchStatus);
router.post('/connect', connectSmartwatch);
router.post('/sync', syncSmartwatch);
router.post('/disconnect', disconnectSmartwatch);

export default router;