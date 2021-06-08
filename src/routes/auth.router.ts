import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

const authController = new AuthController();

router.post('/loginAdmin', authController.loginAdmin);

export default router;