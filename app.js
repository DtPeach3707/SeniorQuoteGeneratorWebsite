const express = require('express'); 
const app = express();
var bodyParser = require('body-parser');

const quote = require('./requests/quote');

const PORT = process.env.PORT || 5000; 

var allow_cors = function(req, res, next)
{
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(express.json()); 
app.use(allow_cors);
app.use(express.static('build')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/quote', (req, res, next) => {
    quote(req, res, next);
});

app.get('/', (req, res, next) => {
    res.sendFile('./build/index.html');
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`) 
}) 
