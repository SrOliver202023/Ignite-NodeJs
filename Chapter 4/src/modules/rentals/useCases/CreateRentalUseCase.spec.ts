import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import utc from 'dayjs/plugin/utc';
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
  });

  it("Should be able to create a new rental.", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return_date: dayAdd24Hours
    });

    console.log(rental);
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it("Should not be able to create a new rental if there is another open to the same user.", async () => {

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: dayAdd24Hours
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return_date: dayAdd24Hours
      });

    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is another open to the same car.", async () => {

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123",
        car_id: "123d-cx412809x-123fdsa12zn",
        expected_return_date: dayAdd24Hours
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "321",
        car_id: "123d-cx412809x-123fdsa12zn",
        expected_return_date: dayAdd24Hours
      });

    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid return time.", async () => {

    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "123",
        car_id: "123d-cx412809x-123fdsa12zn",
        expected_return_date: dayjs().toDate()
      });

    }).rejects.toBeInstanceOf(AppError);
  });



});