const express = require('express');
const { v4:uuidV4 } = require('uuid');

const courses = require('./database.json');

const app = express();

app.use(express.json());

app.get('/courses', (req, res)=>{
  return res.json(courses);
});

app.post('/courses', (req, res)=>{
  const { name } = req.body;

  const newCourse = {
    id: uuidV4().replaceAll('-','') , 
    name,
    order: courses.length + 1
  }
  courses.push(newCourse)

  const courseFound = courses.find(course => course.id === newCourse.id);

  return res.json(courseFound);
})

app.put('/courses/:id', (req, res)=>{
  const { id } = req.params;
  const { newName } = req.body;

  const courseFound = courses.find(course => course.id === id);
  courseFound.name = newName;

  return res.json(courseFound);
})

app.patch('/courses/:id/info', (req, res)=>{
  const { id } = req.params;
  const { evaluation, price, description } = req.body;

  const courseFound = courses.find(course => course.id === id);
  
  courseFound.evaluation = evaluation;
  courseFound.price = price;
  courseFound.description = description;

  return res.json(courseFound);
})

app.delete('/courses/:id', (req, res)=>{
  const { id } = req.params;

  courses.splice(id, 1);

  return res.json(courses);
})

app.listen(3333, ()=> console.log('Server running in http://localhost:3333'))