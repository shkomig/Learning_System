import { Router } from 'express';
import * as exerciseController from '../controllers/exercise.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All exercise routes require authentication
router.use(authenticateToken);

router.get('/adaptive/:studentId', exerciseController.getAdaptiveExercises);
router.post('/submit', exerciseController.submitExercise);
router.get('/:exerciseId/hint', exerciseController.getHint);
router.post('/generate', exerciseController.generateExercises);
router.get('/recommendations/:studentId', exerciseController.getRecommendations);

export default router;


