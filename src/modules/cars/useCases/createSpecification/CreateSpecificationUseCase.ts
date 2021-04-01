import AppError from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";


interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private SpecificationsRepository: ISpecificationsRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.SpecificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new AppError("Specification Already Exists!")
        }

        await this.SpecificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }