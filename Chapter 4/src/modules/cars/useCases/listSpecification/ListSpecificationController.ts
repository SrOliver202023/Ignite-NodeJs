import { Request, Response } from 'express';
import { ListSpecificationUseCase } from './ListSpecificationUseCase';
import { container } from 'tsyringe';

class ListSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase);
    const specification = await listSpecificationUseCase.execute({ name, description });

    return res.status(201).json(specification);
  }
}

const listSpecificationController = new ListSpecificationController().handle;
export { listSpecificationController };