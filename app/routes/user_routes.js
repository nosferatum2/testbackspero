// var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  // render all items like Array from db
  app.get('/', (req, res) => {
    db.collection('users').find().toArray()
      .then(usersArr => {
        res.render('index', { users: usersArr });
      })
      .catch(error => console.error(error));
  })

  // find by mail
  app.get('/:mail', (req, res) => {
    const details = {
      'mail': req.params.mail
    };

    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        // console.log('====================item GET mail');
        // console.log(item);
        // console.log('====================item GET mail');
        res.send(item);
      }
    });
  });

  // write new users in db over 18 years old
  app.post('/users', (req, res) => {
    const user = {
      mail: req.body.mail,
      name: req.body.name,
      surname: req.body.surname,
      age: req.body.age
    };

    if (user.age < 18) {
      const warn = "You're so young for this place!";
      console.error(warn);
      
      res.send({ 'error': warn });
    } else {
      db.collection('users').insertOne(user, (err, result) => {
        if (err) {
          res.send({ 'error': 'An error has occurred' });
        } else {
          res.send(result);
          // res.redirect('/');
        }
      });
    }
  })
};