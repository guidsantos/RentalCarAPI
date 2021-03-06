import AppError from "@shared/errors/AppError"
import { ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Create Category', () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it('should be able to create a new category', async () => {
        const category: ICreateCategoryDTO = {
            name: 'Category Test',
            description: 'Category description Test'
        }

        await createCategoryUseCase.execute(category)

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)


        expect(categoryCreated).toHaveProperty('id')

    })

    it('should no be able to create a new category with same name', async () => {
        const category: ICreateCategoryDTO = {
            name: 'Category Test',
            description: 'Category description Test'
        }

        await createCategoryUseCase.execute(category)
        await expect(createCategoryUseCase.execute(category)
        ).rejects.toEqual(new AppError("Category Already Exists!"))

    })
})