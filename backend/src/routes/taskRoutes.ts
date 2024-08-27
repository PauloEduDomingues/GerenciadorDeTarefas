import { TaskController } from '@/controllers/TaskController';
import express from 'express';

const router = express.Router()
const taskController = new TaskController()

router.post('users/:userId/tasks')
router.put('/users/:userId/tasks/:taskId', taskController.update)
router.delete('/users/:userId/tasks/:taskId', taskController.delete)
router.get('/users/:taskId/tasks', taskController.findById)
router.get('/users/:userId/tasks', taskController.listByUserId)

export { router as taskRoutes }