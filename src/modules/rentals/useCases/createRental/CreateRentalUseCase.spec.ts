import AppError from "@shared/errors/AppError";
import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase
let dayJsDateProvider: DayJsDateProvider

describe('Create Rental', () => {

    const dayAdd24hours = dayjs().add(24, "hours").toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayJsDateProvider = new DayJsDateProvider()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider,
            carsRepositoryInMemory
        )
    })

    it('should be able to create a new rental',
        async () => {
            const car = await carsRepositoryInMemory.create({
                name: 'Car',
                brand: 'brand',
                category_id: '1234',
                daily_rate: 10,
                description: 'description',
                fine_amount: 100,
                license_plate: '1123124',
                id: '1234'
            })
            const rental = await createRentalUseCase.execute({
                user_id: '1235',
                car_id: car.id,
                expected_return_date: dayAdd24hours
            })

            expect(rental).toHaveProperty('id')
            expect(rental).toHaveProperty('start_date')
        })

    it('should not be able to create a new rental if there is another open to the same user',
        async () => {
            await rentalsRepositoryInMemory.create({
                car_id: 'car_id',
                expected_return_date: dayAdd24hours,
                user_id: 'user_id'
            })
            await expect(
                createRentalUseCase.execute({
                    user_id: 'user_id',
                    car_id: 'car2_id',
                    expected_return_date: dayAdd24hours
                })
            ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
        })


    it('should not be able to create a new rental if there is another open to the same car',
        async () => {
            await rentalsRepositoryInMemory.create({
                car_id: 'testCar_id',
                expected_return_date: dayAdd24hours,
                user_id: 'user_id'
            })

            await expect(
                createRentalUseCase.execute({
                    user_id: '456',
                    car_id: 'testCar_id',
                    expected_return_date: dayAdd24hours
                })
            ).rejects.toEqual(new AppError('Car is unavailable!'))
        })

    it('should not be able to create a new rental with invalid return time ',
        async () => {
            await expect(
                createRentalUseCase.execute({
                    user_id: '123',
                    car_id: '121212',
                    expected_return_date: dayjs().add(23, "hours").toDate()
                })
            ).rejects.toEqual(new AppError('Invalid return time!'))
        })
})