const { response } = require('express');
const express = require('express');
const { v4: uuidv4, parse } = require('uuid');
const app = express();
app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(req, res, next){
  const { cpf } = req.headers;
  

  const customer = customers.find(
    customer => customer.cpf === cpf
  )
  if(!customer){
    return res.status(400).send({ error: "Customer not found!" })
  }
  req.customer = customer;
  return next();
}

function getBalance(statement){
  const positiveBalance = statement.filter(item => item.type === 'credit').map(item=> item).reduce((total, item)=> total += item.amount ,0)
  const negativeBalance = statement.filter(item => item.type === 'debit').map(item=> item).reduce((total, item)=> total += item.amount ,0)
  return parseFloat(positiveBalance - negativeBalance);
}

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

  return res.status(201).send(`Success!`)
});

app.use(verifyIfExistsAccountCPF);

app.get('/statement', (req, res)=>{
  const { customer } = req;

  return res.status(201).json(customer.statement);
})

app.post('/deposit', (req, res)=>{
  const { description, amount } = req.body;
  
  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation)

  console.log(`Deposit succeed!`);

  return res.status(201).json({ msg:"Deposit succeed!" });
})

app.post('/withdraw', (req, res)=>{
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);

  if(balance < amount){
    return res.status(400).json( { error: "Insuficient funds!" } )
  }

  const statementOperation = {
    amount, 
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation);

  return res.status(201).json({ msg:"Debit succeed!" })

})

app.get('/statement/date', (req, res)=>{
  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter((statement)=> 
    statement.created_at.toDateString() === new Date(dateFormat).toDateString()
  )

  return res.status(201).json(statement);
})

app.put('/account', (req, res)=>{
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(201).json({ msg:`Rename Succeed! to: ${customer.name}` })
})

app.get('/account', (req, res)=>{
  const { customer } = req;
  return res.json(customer);
})

app.delete('/account', (req, res)=>{
  const { customer } = req;

  customers.splice(customer, 1);
  return res.status(200).json(customers);
})
app.get('/balance', (req, res)=>{
  const { customer } = req;
  
  const balance = getBalance(customer.statement);

  return res.status(201).json({ balance })

})

app.listen(3333, console.log('Server running... In http://localhost:3333'));
