import { container } from 'tsyringe'

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'


container.registerSingleton<IRentalsRepository>(
    "RentalsRepository", RentalsRepository
)