const jwt = require('jsonwebtoken');

module.exports = function (app, db) {
    app.post('/api/user', (req, res) => {   
      const note = { user: req.body.userName, password: req.body.password };
      db.collection('cluster0').insertOne(note, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
  });
};