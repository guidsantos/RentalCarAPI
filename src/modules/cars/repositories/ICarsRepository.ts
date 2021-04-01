import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    findByLicensePlate(license_plate: string): Promise<Car>
    create({
        name,
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate
    }: ICreateCarDTO): Promise<Car>
}

export { ICarsRepository }