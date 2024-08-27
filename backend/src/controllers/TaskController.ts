import { Task } from "@/database/models/Task";
import { taskRepository, userRepository } from "@/repositories";
import { Request, Response } from "express";

export class TaskController{

    async create(request: Request, response: Response){

        const { name, date, description } = request.body
        const { userId } = request.params

        const user = await userRepository.findOneBy({
            id: Number(userId)
        })

        if(!user){
            return response.send(404).send()
        }

        const newTask = new Task()
        newTask.name = name
        newTask.description = description
        newTask.date = date

        try{

            const task = await taskRepository.save(newTask)

            return response.status(201).json(task)

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

        return response.status(201).json(taskRepository)

    }

    async delete(request:Request, response:Response){

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

        await taskRepository.delete(taskWithUser.id)
        return response.status(204).send();
    }

    async findById(request:Request, response:Response){

        const { taskId } = request.params

        const task = await taskRepository.findOneBy({
            id: Number(taskId)
        })

        if(!task){
            return response.send(404).send()
        }

        return response.status(200).json(task)
    }

    async listByUserId(request: Request, response: Response){

        const { userId } = request.params

        const user = await userRepository.findOneBy({
            id: Number(userId)
        })

        if(!user){
            return response.send(404).send();
        }

        return response.status(200).json(user.tasks)
    } 
}