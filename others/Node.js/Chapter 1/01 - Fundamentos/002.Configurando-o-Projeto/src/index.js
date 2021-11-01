const express = require('express');
const app = express();
const PORT = 3333;

/**
  * ========= Métodos HTTP ============
  *  
  * GET - Buscar uma informação dentro do servidor. 
  * POST - Inserir uma informação no servidor. 
  * PUT - Alterar uma informação no servidor. 
  * PATCH - Alterar uma informação específica
  * DELETE - Deletar uma informação no servidor.
  * 
  * ====== Tipos de Parâmetros ==========
  * 
  * Router Params => Identificar um recurso editar/deletar/buscar
  * Query Params => Paginação / Filtro 
  * Body Params => Os Objetos para inserção/alteração (JSON)
  * 
**/
app.use(express.json());
app.get("/courses", (req, res)=>{
  const query = req.query;
  console.log(query);
  return res.json(["Curso 1 ", "Curso 2", "Curso 3"]);

});
app.post("/courses", (req, res)=>{
  const body = req.body;
  console.log(body);
  return res.json(["Curso 1 ", "Curso 2", "Curso 3", "Curso 4"]);

});
app.put("/courses/:id", (req, res)=>{
  const params = req.params;
  console.log(params.id)
  return res.json(["Curso 6 ", "Curso 2", "Curso 3", "Curso 4"]);

});
app.patch("/courses/:id/name", (req, res)=>{
  return res.json(["MineCurso 6 ", "Curso 2", "Curso 3", "Curso 4"]);

});
app.delete("/courses/:id", (req, res)=>{
  return res.json(["Curso 2", "Curso 3", "Curso 4"]);

});

app.listen(PORT, console.log(`Server running... in http://localhost:${PORT}`));