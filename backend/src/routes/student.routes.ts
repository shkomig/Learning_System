import { Router } from 'express';
import * as studentController from '../controllers/student.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All student routes require authentication
router.use(authenticateToken);

router.get('/:id', studentController.getStudent);
router.put('/:id', studentController.updateStudent);
router.get('/:id/progress', studentController.getStudentProgress);
router.get('/:id/stats', studentController.getStudentStats);

export default router;


