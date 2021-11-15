import { createUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { Router } from 'express';


const usersRoutes = Router();

usersRoutes.post("/", createUserController);


export { usersRoutes };