import 'dotenv/config'
import "reflect-metadata"
import { app } from './app';
import { databaseConnection } from './database';

const PORT = Number(process.env.APPLICATION_PORT) || 3333;

databaseConnection();

app.listen(PORT, () => console.log('Server is running!'));
