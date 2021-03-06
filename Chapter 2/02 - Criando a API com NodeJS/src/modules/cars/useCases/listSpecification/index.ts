import { SpecificationsRepository } from '../../repositories/entities/SpecificationsRepository';
import { ListSpecificationUseCase } from './ListSpecificationUseCase';
import { ListSpecificationController } from './ListSpecificationController';

const specificationsRepository = SpecificationsRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(specificationsRepository);
const listSpecificationController = new ListSpecificationController(listSpecificationUseCase);

export { listSpecificationController };