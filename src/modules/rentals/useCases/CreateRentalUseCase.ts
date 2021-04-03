import AppError from "@shared/errors/AppError"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'


import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO"
import { Rental } from "../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"


dayjs.extend(utc)


class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
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
            throw new AppError("There's a rental in progess for user!")
        }

        const dateNow = dayjs().utc().local().format()

        const expectReturnDateFormat = dayjs(expected_return_date)
            .utc().
            local().
            format()

        const compare = dayjs(expectReturnDateFormat).diff(dateNow, "hours")

        if (compare < minimumHour) {
            throw new AppError('Invali return time!')
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