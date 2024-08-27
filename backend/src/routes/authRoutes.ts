
import { UserController } from '@/controllers/UserController';
import express from 'express';

const router = express.Router()
const userController = new UserController

router.post('/auth', userController.login)

export { router as authRoutes }