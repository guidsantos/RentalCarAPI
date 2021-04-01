import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {

    async handle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { brand, name, category_id }: IListAvailableCarsDTO = request.query

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

        const cars = await listAvailableCarsUseCase.execute({
            brand,
            name,
            category_id
        })

        return response.json(cars)
    }
}

export { ListAvailableCarsController }