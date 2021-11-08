import express from 'express';
const app = express();
const PORT = 3333;

import { router } from './routes';

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));