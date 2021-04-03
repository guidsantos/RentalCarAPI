import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import AppError from "@shared/errors/AppError"
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO"
import { Rental } from "../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"





class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository,

        private dateProvider: IDateProvider
    ) { }

    async execute({
        car_id,
        expected_return_date,
        user_id
    }: ICreateRentalDTO): Promise<Rental> {
        const minimumHour = 24

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

        if (carUnavailable) {
            throw new AppError('Car is unavailable!')
        }

        const rentalOpenToUse = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if (rentalOpenToUse) {
            throw new AppError("There's a rental in progress for user!")
        }


        const dateNow = this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

        if (compare < minimumHour) {
            throw new AppError('Invalid return time!')
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        return rental

    }
}

export { CreateRentalUseCase }