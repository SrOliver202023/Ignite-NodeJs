import express from 'express';
const app = express();
const PORT = 3333;
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);


app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`));