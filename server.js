// Import dependencies
const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getUser } = require('./rest/user');

// Initialize Express app
const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Define a route to fetch data from the user table
app.get('/users', getUser);

app.get('/home', (req, res)=>{
  let datas = [
    {
    "name":"difo",
    "gender":"male"
    }
    ,{
    "name":"difo",
    "gender":"male"
    }
  ];
    res.json(datas);
});

app.get('/', (req, res)=>{
  let datas = [
    {
    "name":"difo",
    "gender":"male"
    }
    ,{
    "name":"difo",
    "gender":"male"
    }
  ];
    res.json(datas);
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});