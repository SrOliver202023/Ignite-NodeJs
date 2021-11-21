import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    createCarUseCase = new CreateCarUseCase();
  });
  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({

      name: "Emmerson",
      description: "Description Car",
      daily_rate: 200,
      license_plate: "",
      fine_amount: "string",
      brand: "string",
      category_id: "string"

    });
  });
});