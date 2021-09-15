//Imports with node syntax
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
//END Imports with node syntax

//importing the routes

//END importing the routes

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on ' + port + 'port');
});

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use('/trips', require('./routes/trips'));


const db = require('./keys').mongoURI;


mongoose
  .connect(db, { useNewUrlParser: true})
  .then( () => console.log('Connection to Mongo DB established'))
  .catch(err => console.log(err));