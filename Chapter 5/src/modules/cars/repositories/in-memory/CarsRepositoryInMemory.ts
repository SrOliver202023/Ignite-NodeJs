import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '../interfaces/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { validate } from 'uuid';
class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    const assignCar = {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    };
    if (!validate(id)) delete assignCar.id;
    Object.assign(car, assignCar);

    this.cars.push(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({ brand, category_id, name }: { brand?: string, category_id?: string, name?: string; }): Promise<Car[]> {
    const all = this.cars
      .filter(car => {
        if (car.available === true ||
          (
            (brand && car.brand === brand) ||
            (category_id && car.category_id === category_id) ||
            (name && car.name === name)
          )
        ) {
          return car;
        }
        return null;
      });
    return all;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async changeAvailability(id: string): Promise<Car> {
    const car = this.cars.find(car => car.id === id);

    if (car) {
      const boolean = car.available === true ? false : true;
      car.available = boolean;
    }

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const car = this.cars.find(car => car.id === id);
    car.available = available;
  }
}


export { CarsRepositoryInMemory };