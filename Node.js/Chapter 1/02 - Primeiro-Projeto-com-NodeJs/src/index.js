const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const customers = [];
/**
 * cpf - string
 * name - string
 * id - uuid
 * statement [] 
 */

//some, find
app.post('/account', (req, res)=>{
  const { cpf, name } = req.body;
  
  const customerAlreadyExists = customers.some((customer)=>
    customer.cpf === cpf
  );

  if(customerAlreadyExists){
    return res.status(400).json({ error: "Customer already exists!" })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  res.status(201).send(`Success!`)
  console.log(customers)
});

app.get('/statement', (req, res)=>{
  const { cpf } = req.headers;
  

  const customer = customers.find(
    customer => customer.cpf === cpf
  )
  if(!customer){
    res.status(400).send({ error: "Customer not found!" })
  }



  return res.json(customer.statement);
})











app.listen(3333, console.log('Server running... In http://localhost:3333'));
