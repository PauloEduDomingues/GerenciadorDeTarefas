import { Task } from "@/database/models/Task";
import { TaskDetail } from "@/database/models/TaskDetail";
import { taskDetailRepository, taskRepository, userRepository } from "@/repositories";
import { Request, Response } from "express";

export class TaskController{

    async create(request: Request, response: Response){

        const { name, startDate, endDate, description } = request.body
        const { userId } = request.params

        const user = await userRepository.findOneBy({
            id: Number(userId)
        })

        if(!user){
            return response.send(404).send()
        }

        const newTask = new Task()
        newTask.name = name
        newTask.user = user

        const taskDetail = new TaskDetail
        taskDetail.description = description;
        taskDetail.expectedStartDate = new Date(startDate);
        taskDetail.expectedEndDate = new Date(endDate);

        newTask.taskDetail = taskDetail;

        try{

            await taskRepository.save(newTask)
           
            return response.status(201).json(newTask)

        }catch(error){

            return response.status(401).json({

                message: "Erro ao criar registro",
                error

            })
        }
    }

    async update(request: Request, response: Response){

        const { userId, taskId } = request.params

        const taskWithUser = await taskRepository.findOne({
            where: {
                id: Number(taskId),
                user: {
                    id: Number(userId)
                }
            }
        })

        if(!taskWithUser){
            return response.send(404).send();
        }

        const newTask = request.body

        const updatedTask = taskRepository.merge(taskWithUser, newTask)

        await taskRepository.save(updatedTask)

        return response.status(201).json(updatedTask)

    }

    async delete(request: Request, response: Response) {

        const { userId, taskId } = request.params;
    
        const taskWithUser = await taskRepository.findOne({
            where: {
                id: Number(taskId),
                user: {
                    id: Number(userId),
                },
            },
            relations: ['taskDetail'],
        });
    
        if (!taskWithUser) {
            return response.status(404).send();
        }
    
        if (taskWithUser.taskDetail) {
            await taskDetailRepository.delete(taskWithUser.taskDetail.id);
        }
    
        await taskRepository.delete(taskWithUser.id);
        
        return response.status(204).send();
    }
    

    async listByUserId(request: Request, response: Response) {

        const { userId } = request.params;
    
        const user = await userRepository.findOneBy({
            id: Number(userId),
        });
    
        if (!user) {
            return response.status(404).send();
        }
    
        const tasks = await taskRepository.find({
            where: {
                user: user,
            },
        });
    
        return response.status(200).json(tasks);
    }
     
}