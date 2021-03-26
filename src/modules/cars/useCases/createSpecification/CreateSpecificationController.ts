import { Response, Request } from "express"
import { container } from "tsyringe"
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"


class CreateSpecificationController {
    handle(resquest: Request, response: Response) {
        const { name, description } = resquest.body

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

        createSpecificationUseCase.execute({ name, description })


        return response.status(201).send()
    }
}

export { CreateSpecificationController }