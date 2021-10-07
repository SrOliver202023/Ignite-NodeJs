const express = require('express');
const app = express();
const PORT = 3333;

/**
  * GET - Buscar uma informação dentro do servidor. 
  * POST - Inserir uma informação no servidor. 
  * PUT - Alterar uma informação no servidor. 
  * PATCH - Alterar uma informação específica
  * DELETE - Deletar uma informação no servidor.
**/

app.get("/courses", (req, res)=>{
  return res.json(["Curso 1 ", "Curso 2", "Curso 3"]);

});
app.post("/courses", (req, res)=>{
  return res.json(["Curso 1 ", "Curso 2", "Curso 3", "Curso 4"]);

});
app.put("/courses/:id", (req, res)=>{
  return res.json(["Curso 6 ", "Curso 2", "Curso 3", "Curso 4"]);

});
app.patch("/courses/:id/name", (req, res)=>{
  return res.json(["MineCurso 6 ", "Curso 2", "Curso 3", "Curso 4"]);

});
app.delete("/courses/:id", (req, res)=>{
  return res.json(["Curso 2", "Curso 3", "Curso 4"]);

});

app.listen(PORT, console.log(`Server running... in http://localhost:${PORT}`));