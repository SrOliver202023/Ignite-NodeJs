import 'reflect-metadata';
import { injectable, inject } from "tsyringe";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/interfaces/IUsersRepository";
import { hash } from 'bcrypt';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) { }
  async execute({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) throw new AppError("Email already registered!");

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
      id,
      avatar
    });
  }
}

export { CreateUserUseCase };