import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

jest.useFakeTimers();

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

jest.useFakeTimers();

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider);
  });

  it("Should be able to create a new rental.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it("Should not be able to create a new rental if there is another open to the same user.", async () => {
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "3214",
        expected_return_date: dayAdd24Hours
      })

    ).rejects.toEqual(new AppError("There's a rental in progress for user!", 400));
  });

  it("Should not be able to create a new rental if there is another open to the same car.", async () => {
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: "123d",
      expected_return_date: dayAdd24Hours
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "123d",
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError("Car is unavailable!", 400));
  });

  it("Should not be able to create a new rental with invalid return time.", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "123",
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("Invalid return time!", 401));
  });

  it("It should not be possible to show cars with an open end date.", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Test",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    const carsAvailable = await carsRepositoryInMemory.findAvailable({});

    const findCarUnavailable = carsAvailable.some(car => car.id === rental.car_id);
    expect(findCarUnavailable).toBe(false);
  });

});