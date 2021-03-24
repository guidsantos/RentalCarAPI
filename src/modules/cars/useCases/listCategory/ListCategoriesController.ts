import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

    handle(request: Request, response: Response) {
        const listAll = this.listCategoriesUseCase.execute()

        return response.json(listAll)
    }
}

export { ListCategoriesController }