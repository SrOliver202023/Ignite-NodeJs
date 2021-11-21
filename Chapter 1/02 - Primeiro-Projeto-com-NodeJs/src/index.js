const express = require('express');
const app = express();
const PORT = 3333;

const Routes = require('./routes');

app.use(express.json());

app.use(Routes);


app.listen(PORT, ()=> console.log(`Server is running in http://localhost:${PORT}`))