import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  findByIds(ids: string[]): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  };

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

};

export { SpecificationsRepository };