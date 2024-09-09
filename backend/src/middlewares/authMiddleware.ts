import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    userId: number
    name: string
}

export function authMiddleware(){

    return (request: Request, response: Response, next: NextFunction) => {

        try{

            const { authorization } = request.headers

            if(!authorization) throw new Error("Token não informado!")
    
            const token = authorization.split(' ')[1]
            const { userId, name } = jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload
    
            request.body.tokenPayload = {userId, name}
    
            next()

        } catch (error) { 

            return response.status(401).json({
            message: error.message
            });
            
        }
    }
}

