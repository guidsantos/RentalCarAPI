import { Response, Request, response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";


class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, driver_liscense, password } = request.body

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({
            name,
            email,
            driver_liscense,
            password
        })

        return response.status(201).send()
    }
}

export { CreateUserController }