import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/interfaces/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/interfaces/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string,
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    if (rental && rental.end_date !== null) throw new AppError("Rental already closed");

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.
      compareInDays(rental.start_date, this.dateProvider.dateNow());

    daily = daily <= 0 ? minimum_daily : daily;

    const delay = this.dateProvider.
      compareInDays(dateNow, rental.expected_return_date);


    let total = 0;

    if (delay > 1) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.changeAvailability(car.id);
    // await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }



}

export { DevolutionRentalUseCase };