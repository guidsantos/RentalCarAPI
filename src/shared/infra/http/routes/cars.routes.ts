import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'


const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.post('/', ensureAuthenticated, createCarController.handle)


export { carsRoutes }