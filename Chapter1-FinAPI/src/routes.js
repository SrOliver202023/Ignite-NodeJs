const Route = require('express').Router();
const { v4:uuidv4 } = require('uuid');

const customers = [];

function verifyIfExistsAccountCPF(req, res, next){

  const { cpf } = req.headers;

  const customerFound = customers.find( customer => customer.cpf === cpf);
  
  if(!customerFound) return res.status(400).json({ error: "Customer not found!" })

  req.customer = customerFound;
  
  return next();
}

function getBalance(statement){
  return statement.reduce((acc, operation)=>{
    if(operation.type === 'credit'){
      return acc + operation.amount;
    }else{
      return acc - operation.amount;
    }
  }, 0);
}

Route.post('/account', (req, res)=>{
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(
    customer => customer.cpf === cpf
  );

  if(customerAlreadyExists) return res.status(400).json({ error: "Customer already exists!" })

  const newAccount = {
    uuid: uuidv4(),
    name,
    cpf,
    statement: []
  };

  customers.push(newAccount);
  
  return res.status(201).json({ msg: "Customer created with success!" });
});

Route.get('/statement', verifyIfExistsAccountCPF, (req, res)=>{
  const { cpf } = req.headers;

  const customerFound = customers.find(customer =>customer.cpf === cpf);

  if(!customerFound) return res.status(400).json({ error: "Customer not found!" })

  return res.status(201).json( customerFound.statement );
});

Route.post('/deposit', verifyIfExistsAccountCPF, (req, res)=>{
  const { description, amount } = req.body;
  const { customer } = req;

  const statementOperation = {
    amount,
    type: "credit",
    description,
    created_at: new Date()
  };

  customer.statement.push(statementOperation);

  return res.status(201).json({ msg: "Successfully deposited!" })

})

Route.post('/withdraw', verifyIfExistsAccountCPF, (req, res)=>{
  const { amount } = req.body;
  const { customer } = req;

  const balance = getBalance(customer.statement);
  if(balance < amount) return res.status(400).json({ error: "Insufficient funds!" })

  const statementOperation = {
    amount,
    created_at:new Date(),
    type: "debit"
  };

  customer.statement.push(statementOperation);

  return res.status(201).json({ msg: "Successfully debited!" })
})

Route.get('/statement/date', verifyIfExistsAccountCPF, (req, res)=>{
  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");
  const statement = customer.statement.filter(statement => 
    statement.created_at.toDateString() === new Date
    (dateFormat).toDateString()
  );

  return res.status(201).json( statement );
});

Route.put('/account', verifyIfExistsAccountCPF, (req, res)=>{
  const { name } = req.body;
  const { customer } = req;

  customer.name = name;

  return res.status(201).json({ msg: "Your name has been renamed" })

});

Route.get('/account', verifyIfExistsAccountCPF, (req, res)=>{
  const { customer } = req;

  return res.status(200).json(customer);

});

Route.delete('/account', verifyIfExistsAccountCPF, (req, res)=>{
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(200).json(customers);
})

Route.get('/balance', verifyIfExistsAccountCPF, (req, res)=>{
  const { customer } = req;
  
  const balance = getBalance(customer.statement);

  return res.status(200).json(balance);
})


module.exports = Route;