import AppError from "@shared/errors/AppError";
import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../repositories/repositories/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let createRentalUseCase: CreateRentalUseCase

describe('Create Rental', () => {

    const dayAdd24hours = dayjs().add(1, "day").toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
    })

    it('should be able to create a new rental',
        async () => {
            const rental = await createRentalUseCase.execute({
                user_id: '1235',
                car_id: '121212',
                expected_return_date: dayAdd24hours
            })

            expect(rental).toHaveProperty('id')
            expect(rental).toHaveProperty('start_date')
        })

    it('should not be able to create a new rental if there is another open to the same user',
        async () => {
            expect(
                async () => {
                    await createRentalUseCase.execute({
                        user_id: '1235',
                        car_id: '121212',
                        expected_return_date: dayAdd24hours
                    })

                    await createRentalUseCase.execute({
                        user_id: '1235',
                        car_id: '121212',
                        expected_return_date: dayAdd24hours
                    })
                }).rejects.toBeInstanceOf(AppError)
        })


    it('should not be able to create a new rental if there is another open to the same car',
        async () => {
            expect(
                async () => {
                    await createRentalUseCase.execute({
                        user_id: '123',
                        car_id: '121212',
                        expected_return_date: dayAdd24hours
                    })

                    await createRentalUseCase.execute({
                        user_id: '456',
                        car_id: '121212',
                        expected_return_date: dayAdd24hours
                    })
                }).rejects.toBeInstanceOf(AppError)
        })

    it('should not be able to create a new rental with invalid return time ',
        async () => {
            expect(
                async () => {
                    await createRentalUseCase.execute({
                        user_id: '123',
                        car_id: '121212',
                        expected_return_date: dayjs().add(23, "hours").toDate()
                    })
                }).rejects.toBeInstanceOf(AppError)
        })
})