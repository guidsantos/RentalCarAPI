import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementantions/UsersRepository";

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('Token missing', 401)
    }

    const [, token] = authHeader.split(" ")
    try {
        const { sub: user_id } = verify(token, "cc06f026602baeb4610d0b7a9059280c") as IPayload

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('User does not exists!')
        }

        next()
    } catch {
        throw new AppError("Invalid token!", 401)
    }


}