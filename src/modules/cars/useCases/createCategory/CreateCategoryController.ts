import { Response, Request } from "express"
import { container } from "tsyringe"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


class CreateCategoryController {

    async handle(resquest: Request, response: Response): Promise<Response> {

        const { name, description } = resquest.body

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

        createCategoryUseCase.execute({ name, description })


        return response.status(201).send()

    }
}

export { CreateCategoryController }