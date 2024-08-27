import { AppDataSource } from "@/data-source";
import { Task } from "@/database/models/Task";

export const taskRepository = AppDataSource.getRepository(Task)