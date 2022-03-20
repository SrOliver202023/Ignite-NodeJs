import { ICarsImagesRepository } from "@modules/cars/repositories/interfaces/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/interfaces/ICarsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/Interfaces/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ car_id, images_name }: IRequest) {
    const car = await this.carsRepository.findById(car_id);

    if (!car) throw new AppError('Non-existent car!');

    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase };