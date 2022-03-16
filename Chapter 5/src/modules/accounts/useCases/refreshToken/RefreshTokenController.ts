import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';
import { Request, Response } from 'express';


class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;
    ;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute(token);
    return response.json(refresh_token);

  }
}

const refreshTokenController = new RefreshTokenController().handle;
export { refreshTokenController };