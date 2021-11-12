import { ISpecificationsRepository } from '../../repositories/interfaces/ISpecificationsRepository';
import { Specification } from '../../entities/Specification';

interface IRequest {
  name: string;
  description: string;
}

class ListSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute({ name }: IRequest): Specification {
    const specification = this.specificationsRepository.findByName(name);

    if (!specification) {
      throw new Error("Specification not found!");
    }

    return specification;
  }
}

export { ListSpecificationUseCase };