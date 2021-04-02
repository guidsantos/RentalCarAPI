import { Router } from 'express'
import multer from 'multer'


import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import uploadConfig from '@config/upload'


import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController'




const createCarController = new CreateCarController()
const createCarSpecificationController = new CreateCarSpecificationController()
const listAvailableCarsController = new ListAvailableCarsController()
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload("./tmp/cars"))

const carsRoutes = Router()

carsRoutes.post('/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
)

carsRoutes.get('/available',
    listAvailableCarsController.handle
)

carsRoutes.post('/specifications/:id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
)

carsRoutes.post('/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    upload.array('images'),
    uploadCarImagesController.handle
)


export { carsRoutes }