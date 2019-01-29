const express = require('express');
const router  = express.Router();
const User = require('../models/users');
const bcrypt  = require('bcryptjs');


router.post('/', async (req, res) => {
  console.log('in post ')
  const password = req.body.password;

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.email    = req.body.email;
  userDbEntry.password = hashedPassword;

  try {
    const createdUser = await User.create(userDbEntry);
    console.log('=====================================');
    console.log(createdUser);
    console.log('=====================================');;
    req.session.username = createdUser.username;
    req.session.logged   = true;

    res.redirect('/preferences');



  } catch(err){
    res.send(err);
  }

});
// const login = async () => {
//   console.log('in login');
//   const password = req.body.password;
//
//   const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//
//   const userDbEntry = {};
//   userDbEntry.username = req.body.username;
//   userDbEntry.email    = req.body.email;
//   userDbEntry.password = hashedPassword;
//
//   try {
//     const createdUser = await User.create(userDbEntry);
//     console.log('=====================================');
//     console.log(createdUser);
//     console.log('=====================================');;
//     req.session.username = createdUser.username;
//     req.session.logged   = true;
//
//     res.redirect('/profile');
//
//
//
//   } catch(err){
//     res.send(err);
//   }
// }
//
// module.exports = {
//   'login': login
// }


// router.post('/', (req, res) => {
//   console.log(req.body);
//   User.create(req.body, (err, createdUser) => {
//     if(err) {
//       console.log(err);
//     }else {
//       console.log(createdUser);
//       res.send(createdUser);
//     }
//   })
// });

// router.post('/login', async (req, res) => {
//
//   try {
//
//     // const loggedUser = await User.findOne({username: req.body.username})
//     // Once we create our user
//     req.session.username = req.body.username;
//     req.session.logged   = true;
//
//     console.log(req.session);
//     // establish our session
//     // res.redirect('/authors');
//
//
//   } catch(err){
//     res.send(err);
//   }
//
// });


module.exports = router;
