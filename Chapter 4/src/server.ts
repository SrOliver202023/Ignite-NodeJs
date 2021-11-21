import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { router } from './shared/infra/http/routes';
import swaggerFile from './swagger.json';

import "@shared/infra/typeorm";
import "./shared/container";
import { AppError } from './shared/errors/AppError';

const app = express();
const PORT = 3333;

app.use(express.json());
app.get('/test', (req, res) => res.json({ msg: "Hello World!" }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/test', (req, res) => {
  return res.status(200).json({ msg: "Hello people!" });
});

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ status: "error", message: `Internal server error - ${err.message}` });
});

app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));