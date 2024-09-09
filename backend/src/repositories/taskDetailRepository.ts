import { AppDataSource } from "@/data-source";
import { TaskDetail } from "@/database/models/TaskDetail";

export const taskDetailRepository = AppDataSource.getRepository(TaskDetail)