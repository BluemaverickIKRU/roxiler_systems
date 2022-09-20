const express = require('express');
const axios = require('axios');

const app = express();

// Endpoint to get all the todo's without user id field
app.get('/todos', async (req, res) => {
  // Fetching data from the third party API
  const data = await axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.data);

  // Filter out the user Id field from the data recieved
  const updatedData = data.map((item) => {
    delete item.userId;
    return item;
  });

  // Filtered data is send back as response
  res.send(updatedData);
});

// Endpoint to get the user information from the given user id
app.get('/user/:id', async (req, res) => {
  // Storing the params value
  const paramValue = req.params.id;

  // Fetching the user data specific to the param value
  let userData = await axios
    .get(`https://jsonplaceholder.typicode.com/users/${paramValue}`)
    .then((response) => response.data);

  // Deleting unwanted keys from the object to match the expected output
  delete userData.address;
  delete userData.company;
  delete userData.website;
  delete userData.username;

  // Fetching all todos of the specific user provides in the params
  let todoData = await axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.data);

  // Filter the todoData to have only the data related to the specified user
  todoData = todoData.filter((item) => item.userId == paramValue);

  //   Creating a key,value pair containg the todos data of the specific user
  userData.todos = todoData;

  res.send(userData);
});

module.exports = app;
