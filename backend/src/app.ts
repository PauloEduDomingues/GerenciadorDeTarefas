import express from 'express';
import { authRoutes, registerRoutes, userRoutes, taskRoutes } from './routes'
import { authMiddleware } from './middlewares'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api', registerRoutes);
app.use('/api', authRoutes);

app.use(authMiddleware());

app.use(
    '/api',
    userRoutes,
    taskRoutes
);

export { app };