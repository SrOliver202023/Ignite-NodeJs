import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import { IUsersRepository } from "../interfaces/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, username, email, driver_license, password }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);

    //  throw new Error('Method not implemented.');
  }
}

export { UsersRepository };