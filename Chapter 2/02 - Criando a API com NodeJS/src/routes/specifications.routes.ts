import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/entities/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body;
  const createSpecificationService = new CreateSpecificationService(specificationsRepository);

  createSpecificationService.execute({ name, description });

  return res.status(201).json({ msg: "Specifications registered successfully !" });
});


specificationsRoutes.get('/', (req, res) => {
  const { name } = req.body;
  const specificationFound = specificationsRepository.findByName(name);

  return res.status(201).json(specificationFound);
});

export { specificationsRoutes };