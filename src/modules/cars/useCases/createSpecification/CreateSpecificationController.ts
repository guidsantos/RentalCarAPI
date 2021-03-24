import { Response, Request } from "express"
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"


class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }
    handle(resquest: Request, response: Response) {
        const { name, description } = resquest.body

        this.createSpecificationUseCase.execute({ name, description })


        return response.status(201).send()
    }
}

export { CreateSpecificationController }