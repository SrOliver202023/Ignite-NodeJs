import { verify, decode } from "jsonwebtoken";
import { Request, Response, NextFunction, } from "express";
import { UsersRepository } from "../modules/accounts/repositories/implementatios/UsersRepositories";
import { AppError } from '../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuhtenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "43f6ff5e33b659b0e23892d9cd64eae3") as IPayload; // { iat, exp, sub}
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exists!", 401);

    req.user = {
      id: user_id
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }

}