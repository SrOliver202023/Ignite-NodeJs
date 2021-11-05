import express, { application } from 'express';
import { createCourse } from './routes';
const app = express();
const PORT = 3333;

app.get('/', createCourse);


app.listen(PORT, ()=> console.log(`Server is running in http://locahost:${PORT}`));
