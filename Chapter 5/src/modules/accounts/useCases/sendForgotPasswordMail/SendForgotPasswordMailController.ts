import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    console.log(`OK!+`);

    const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

    await sendForgotPasswordMailUseCase.execute(email);

    return response.status(200).json({ msg: "Recovery email sent" });
  };
};

export { SendForgotPasswordMailController };