import { verify, decode } from "jsonwebtoken";
import { Request, Response, NextFunction, } from "express";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { AppError } from '@shared/errors/AppError';
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuhtenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_token
    ) as IPayload; // { iat, exp, sub}

    req.user = {
      id: user_id
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }

}