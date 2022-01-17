import { AppError } from "@shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/interfaces/IRentalsRepository";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }
  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimunHour = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    // if (carUnavailable) {
    //   if (carUnavailable.car_id !== null && carUnavailable.end_date === null) {
    //     throw new AppError("Car is unavailable!");
    //   }
    // }

    if (carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) throw new AppError("There's a rental in progress for user!");

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimunHour) throw new AppError("Invalid return time!");

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    });

    const carChangeAvailability = await this.carsRepository.changeAvailability(car_id);

    return rental;
  }
}

export { CreateRentalUseCase };