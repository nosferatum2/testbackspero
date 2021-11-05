const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');

// encode url
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  const testbacksperoDB = database.db('testbackspero');
  
  if (err) return console.log(err)
  // import from index.js
  require('./app/routes')(app, testbacksperoDB);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });               
})


