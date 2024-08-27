import { AppDataSource } from "@/data-source";
import { User } from "@/database/models/User";

export const userRepository = AppDataSource.getRepository(User)