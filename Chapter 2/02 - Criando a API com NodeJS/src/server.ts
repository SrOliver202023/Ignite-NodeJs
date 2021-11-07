import express from 'express';
const app = express();
const PORT = 3333;
import { categoriesRoutes } from './routes/categories.routes';

app.use(express.json());
app.use('/categories', categoriesRoutes);

app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));