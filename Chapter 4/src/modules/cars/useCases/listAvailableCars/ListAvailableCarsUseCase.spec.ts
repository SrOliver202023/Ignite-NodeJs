import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "category_id"
    });
    const { name, brand, category_id } = car;
    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description 2",
      daily_rate: 650.0,
      license_plate: "TES-1234",
      fine_amount: 500,
      brand: "Car_brand_test",
      category_id: "category_id"
    });

    const { name, brand, category_id } = car;

    const cars = await listCarsUseCase.execute({ brand });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description 2",
      daily_rate: 650.0,
      license_plate: "TES-1234",
      fine_amount: 500,
      brand: "Car_brand_test",
      category_id: "category_id"
    });

    const { name, brand, category_id } = car;

    const cars = await listCarsUseCase.execute({ name });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description 2",
      daily_rate: 650.0,
      license_plate: "TES-1234",
      fine_amount: 500,
      brand: "Car_brand_test",
      category_id: "12345"
    });

    const { name, brand, category_id } = car;

    const cars = await listCarsUseCase.execute({ category_id });
    expect(cars).toEqual([car]);
  });

});