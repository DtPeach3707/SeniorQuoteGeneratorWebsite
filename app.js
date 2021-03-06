const express = require('express'); 
const app = express();
var bodyParser = require('body-parser');
const path = require('path');

const quote = require('./requests/quote');

const PORT = process.env.PORT || 5000; 

var co_url = "https://senior-quote-generator.herokuapp.com/" // Setting url to accept requests from

var allow_cors = function(req, res, next)
{
  res.header('Access-Control-Allow-Origin', co_url);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
}

app.use(express.json()); 
app.use(allow_cors); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build'))); // static css and js files

app.post('/quote', (req, res, next) => {
    var origin = req.get('origin');
    quote(req, res, next);
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`) 
}) 
