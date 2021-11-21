import { ISpecificationsRepository } from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository) { }

  async execute({ name }: IRequest): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();

    return specifications;
  }
}

export { ListSpecificationUseCase };