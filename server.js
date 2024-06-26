// This line imports the Express module, which is a lightweight web application framework for Node.js.
const express = require('express')
// Here, an instance of an Express application is created. This app object will be used to define routes and other configurations for the web server.
const app = express()
const db = require('./db');
//CONFIGURING .env file
require('dotenv').config();
//taking PORT variable value from .env
const PORT = process.env.PORT || 3000;

//imported person module from person.js in modules folder
const Person = require('./models/person');

//imprted menu module from menu.js
const Menu = require('./models/menu');

//importing bodyParser from express.js
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

app.get('/', function (req, res) {
  res.send('Welcome to the hotel')
})

//Import the person route files
const personRoute = require('./routes/personRoute');

//use the routes
app.use('/person', personRoute);

//Import the menu route files
const menuRoute = require('./routes/menuRoute');

//use the routes
app.use('/menu', menuRoute);

//This starts the server and makes it listen on port 3000 for incoming connections.
app.listen(PORT, function (){
    console.log("Port 3000 is running") 
})