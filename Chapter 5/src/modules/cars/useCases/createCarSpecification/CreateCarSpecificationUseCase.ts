import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) throw new AppError("Car does not exists!", 401);

    const specifications = await this.specificationsRepository.findByIds(specifications_id);

    carExists.specifications = specifications;

    const result = await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };