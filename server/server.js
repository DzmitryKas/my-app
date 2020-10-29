const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const path = require('path');

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  var db = client.db('mytestingdb');

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);  
  })
})



