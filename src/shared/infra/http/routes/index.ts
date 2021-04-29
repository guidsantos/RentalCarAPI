import { Router } from "express"
import { authenticateRoutes } from "./authenticate.routes"
import { carsRoutes } from "./cars.routes"
import { categoriesRoutes } from "./categories.routes"
import { passwordRoutes } from "./password.routes"
import { rentalsRoutes } from "./rental.routes"
import { specificationsRoutes } from "./specifications.routes"
import { userRoutes } from "./users.routes"


const router = Router()


router.use('/categories', categoriesRoutes)
router.use('/specification', specificationsRoutes)
router.use('/users', userRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalsRoutes)
router.use(authenticateRoutes)
router.use('/password', passwordRoutes)

export { router }