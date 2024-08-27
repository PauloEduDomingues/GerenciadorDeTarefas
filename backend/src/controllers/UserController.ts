import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@/database/models/User";
import { userRepository } from "@/repositories";


export class UserController{

    async create(request: Request, response: Response){

        const { name, email, password } = request.body

        const newUser = new User
        newUser.name = name
        newUser.email = email
        newUser.password = await bcrypt.hash(password, 10)

        try{

            const user = await userRepository.save(newUser)

            return response.status(201).json(user)

        }catch(error){

            return response.status(401).json({

                message: "Erro ao criar registro",
                error

            })
        }
    }

    async login(request: Request, response: Response){

        const { email, password } = request.body

        const user = await userRepository.findOne({
            where: {
                email
            }
        })

        if(!user || !(await bcrypt.compare(password, user.password))){
            return response.status(401).json({message: "Email ou senha inválidos!"})
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: 300})
        return response.json({ auth: true, token: token })
    }

    async update(request: Request, response: Response){

        const { userId } = request.params
        const newUserData = request.body

        try{
            const user = await userRepository.findOneBy({id: Number(userId)})

            if(!user){
                return response.send(404).send();
            }

            userRepository.merge(user, newUserData);
            await userRepository.save(user);

            return response.status(200).json(user)

        }catch(error){

            return response.status(500).json({message: "Erro ao atualizar usuário!", error})

        }
    }

    async delete(request: Request, response: Response){

        const { userId } = request.params
        
        const user = await userRepository.findOneBy({id: Number(userId)})

        if(!user){
            return response.status(404).send()
        }

        await userRepository.delete({id:Number(userId)})

        return response.status(204).send()
    }

}