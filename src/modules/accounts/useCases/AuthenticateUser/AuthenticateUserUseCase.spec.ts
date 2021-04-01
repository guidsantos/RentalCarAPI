import AppError from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


describe('Authenticate User', () => {

    let authenticateUserUseCase: AuthenticateUserUseCase
    let usersRepositoryInMemory: UsersRepositoryInMemory
    let createUserUseCase: CreateUserUseCase

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    })

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_liscense: '000123',
            email: 'email@test.com',
            password: '1234',
            name: "User Test"
        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })
    it('should not be able authenticate an nonexistent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    it('should not be able authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_liscense: '000123',
                email: 'email@test.com',
                password: '1234',
                name: "User Test"
            }

            await createUserUseCase.execute(user)
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'wrongpass'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})