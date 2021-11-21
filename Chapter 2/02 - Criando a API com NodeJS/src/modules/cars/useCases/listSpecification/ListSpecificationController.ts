import { Request, Response } from 'express';
import { ListSpecificationUseCase } from './ListSpecificationUseCase';

class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) { }
  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const specification = this.listSpecificationUseCase.execute({ name, description });

    return res.status(201).json(specification);
  }
}

export { ListSpecificationController };