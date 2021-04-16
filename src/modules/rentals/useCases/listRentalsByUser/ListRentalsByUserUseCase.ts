import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { injectable, inject } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute(user_id: string): Promise<Rental[]> {
        return await this.rentalsRepository.findByUserId(user_id)
    }
}

export { ListRentalsByUserUseCase }