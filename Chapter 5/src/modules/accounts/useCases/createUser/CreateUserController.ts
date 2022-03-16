import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license, id, avatar_file } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
      id,
      avatar: avatar_file
    });

    return res.status(201).json({ msg: "Account created  successfully!" });

  }

}

const createUserController = new CreateUserController().handle;
export { createUserController };