import { ICarsImagesRepository } from "@modules/cars/repositories/interfaces/ICarsImagesRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(

    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {

  }
  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };