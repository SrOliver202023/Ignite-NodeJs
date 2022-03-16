import { CreateCarUseCase } from './CreateCarUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({

      name: "Car Test",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"

    });

    expect(car).toHaveProperty('id');
  });

  it("Should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({

      name: "Car Test",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"

    });

    await expect(
      createCarUseCase.execute({
        name: "Car Test 2",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category"
      })
    ).rejects.toEqual(new AppError("Car already exists!", 401));
  });

  it("Should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Test",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    expect(car.available).toBe(true);
  });

});