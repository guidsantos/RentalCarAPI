import { Response, Request } from "express"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"


class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }
    handle(resquest: Request, response: Response) {
        const { name, description } = resquest.body

        this.createCategoryUseCase.execute({ name, description })


        return response.status(201).send()
    }
}

export { CreateCategoryController }