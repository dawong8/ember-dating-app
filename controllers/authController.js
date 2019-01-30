const express = require('express');
const router  = express.Router();
const Users = require('../models/users');
const bcrypt  = require('bcryptjs');


router.get('/login', (req, res) => {
	res.render('users/login.ejs', {
		message: req.session.message
	})
});

router.post('/', async (req, res) => {
  console.log('in post ')
  const password = req.body.password;

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.email    = req.body.email;
  userDbEntry.password = hashedPassword;

  try {
    const createdUser = await Users.create(userDbEntry);
    console.log('=====================================');
    console.log(createdUser);
    console.log('=====================================');;
    req.session.username = createdUser.username;
    req.session.logged   = true;

    res.redirect(`/user/${createdUser.id}/profile`);



  } catch(err){
    res.send(err);
  }

});

router.post('/login', async (req, res) => {

  try {

    const foundUser = await Users.findOne({username: req.body.username});

    if(foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.message = '';
        req.session.username = foundUser.username;
        req.session.logged = true;

        console.log('**********************');
        console.log('logged', foundUser);
        console.log('**********************');


        res.redirect(`/user/${foundUser.id}/main`);

        //successful login 

      }else {
        //Add an ALERT?
        req.session.message = 'Username or password are incorrect';
        console.log(req.session.message);
        res.redirect('/auth/login');
      }
    }else {
      //Add an ALERT?
      req.session.message = 'Username or password are incorrect';
      res.redirect('/auth/login');
    }

  } catch (err) {
    console.log('ERROR', err);
    res.send(err);
  }

});

router.get('logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    }else {
      req.redirect('');
    }
  });
});

module.exports = router;
