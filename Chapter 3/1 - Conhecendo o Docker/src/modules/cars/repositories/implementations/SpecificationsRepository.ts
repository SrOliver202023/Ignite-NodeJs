import { Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.specifications.push(specification);

  };

  findByName(name: string): Specification {
    const specification = this.specifications.find(specification =>
      specification.name === name
    );
    return specification;
  }

};

export { SpecificationsRepository };