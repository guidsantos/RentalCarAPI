import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string,
    description: string
}

class CreateSpecificationUseCase {
    constructor(private SpecificationsRepository: ISpecificationsRepository) { }

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.SpecificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new Error("Specification Already Exists!")
        }

        this.SpecificationsRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }