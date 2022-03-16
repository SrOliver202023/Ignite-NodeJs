import { app } from './app';

// const PORT = process.env.NODE_ENV === "test" ? 4444 : 3333;
const PORT = 3333;


const server = app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

export { server };