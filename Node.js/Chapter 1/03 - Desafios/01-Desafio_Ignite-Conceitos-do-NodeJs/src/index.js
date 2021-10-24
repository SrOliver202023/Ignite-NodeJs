const express = require('express');
const cors = require('cors');

const { v4: uuidv4, v4 } = require('uuid');
const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const userFound = users.find(user => user.username === username);
  if(!userFound) return response.status(404).json({ error: "User not found!" })

  request.user = userFound;
  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body
  const userFound =  users.some(user => user.username === username);
  if(userFound) return response.status(400).json({ error: "User already exists!" })

  const newUser = {
    id: uuidv4(),
    name: name,
    username: username,
    todos: []
  }
  users.push(newUser);
  return response.status(201).json(newUser)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.status(201).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const newTask = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }
  user.todos.push(newTask);
  return response.status(201).json(newTask);

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { id } = request.params;
  const { user } = request;
  const todoFound = user.todos.find((item) => item.id === id);

  if(!todoFound) return response.status(404).json({ error: "Not found!" })

  todoFound.title = title;
  todoFound.deadline = new Date(deadline);

  return response.status(201).json(todoFound);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todoFound = user.todos.find(item => item.id === id);
  if(!todoFound) return response.status(404).json({ error: "Not found!" })

  todoFound.done = true;

  return response.status(201).json(todoFound);
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { id } = request.params;
  const { user } = request;

  const todoFound = user.todos.find(item => item.id === id);
  
  if(!todoFound) return response.status(404).json({ error: 'Not found' })
  user.todos.splice(todoFound, 1);

  response.status(204).json(user.todos);
});

module.exports = app;