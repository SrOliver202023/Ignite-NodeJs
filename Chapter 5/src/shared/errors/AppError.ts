export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly description: string;

  constructor(message: string, statusCode = 400, description?: string) {
    this.message = message;
    this.statusCode = statusCode;
    this.description = description;
  }
}