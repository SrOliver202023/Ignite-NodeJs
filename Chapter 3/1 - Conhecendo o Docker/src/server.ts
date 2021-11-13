import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import swaggerFile from './swagger.json';

import "./database";
import "./shared/container";


const app = express();
const PORT = 3333;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/test', (req, res) => {
  return res.status(200).json({ msg: "Hello people!" });
});


app.use(router);

app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));