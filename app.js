const express = require('express'); 
const app = express();
var bodyParser = require('body-parser');
const path = require('path');

const quote = require('./requests/quote');

const PORT = process.env.PORT || 5000; 

var allow_cors = function(req, res, next)
{
  res.header('Access-Control-Allow-Origin', 'https://senior-quote-generator.herokuapp.com/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.use(express.json()); 
app.use(allow_cors); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build'))); // static css and js files

app.get('/quote', (req, res, next) => {
    var origin = req.get('origin');
    quote(req, res, next);
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`) 
}) 
