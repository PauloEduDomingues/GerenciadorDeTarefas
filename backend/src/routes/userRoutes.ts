import { UserController } from '@/controllers/UserController';
import express from 'express';

const router = express.Router()
const userController = new UserController()

router.put('/users/:userId', userController.update)
router.delete('/users/:userId', userController.delete)

export { router as userRoutes }