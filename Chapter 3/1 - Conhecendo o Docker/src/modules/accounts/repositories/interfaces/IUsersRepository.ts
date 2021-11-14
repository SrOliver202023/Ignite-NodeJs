import { User } from '../../entities/User';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';


interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { ICreateUserDTO, IUsersRepository };