const express = require('express');
const router  = express.Router();
const User = require('../models/users');
const bcrypt  = require('bcryptjs');


<<<<<<< HEAD
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

=======
>>>>>>> profiles-again

router.get('/', (req, res) => {

	Users.find({}, (err, allUsers) => {
		if (err) {
			res.send(err); 
		} else {
			res.render('users/index.ejs', {
				user: allUsers
			});

		}
	})
})





// Edit Profile Page 
router.get('/:id/profile', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id); 
		res.render('users/edit.ejs', {
			user: profile
		})
	} catch (err) {
		res.send(err); 
	}
});

router.put('/:id', async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});

		res.redirect(`/user/${req.params.id}/preferences`);
	} catch (err) {
		res.send(err); 
	}
});





// edit 

router.get('/:id/preferences', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id); 
		res.render('users/preferences.ejs', {
			user: profile
		})
	} catch (err) {
		res.send(err); 
	}
});


router.put('/preferences/:id', async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});

		res.redirect(`/user/${req.params.id}/looking`);
	} catch (err) {
		res.send(err); 
	}
});






router.get('/:id/looking', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id); 
		res.render('users/looking.ejs', {
			user: profile
		})
	} catch (err) {
		res.send(err); 
	}
});


router.put('/looking/:id', async (req, res) => {
	try {

		const profile = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});


		res.redirect(`/user`);
	} catch (err) {
		res.send(err); 
	}
});



// create user 
router.post('/', (req, res) => {
	Users.create(req.body, (err, createdUser) => {
		if (err) {
			res.send(err); 
		} else {
			res.redirect('/user');
		}
	})
}); 



// Edit Entire User


<<<<<<< HEAD
=======
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

router.post('/login', async (req, res) => {

  try {

    const foundUser = await User.findOne({username: req.body.username});

    if(foundUser) {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.message = '';
        req.session.username = foundUser.username;
        req.session.logged = true;

        console.log('**********************');
        console.log('logged', foundUser);
        console.log('**********************');


        res.redirect('/preferences')
      }else {
        //Add an ALERT?
        req.session.message = 'Username or password are incorrect';
        console.log(req.session.message);
        res.redirect('/login');
      }
    }else {
      //Add an ALERT?
      req.session.message = 'Username or password are incorrect';
      res.redirect('/login');
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

>>>>>>> profiles-again
module.exports = router;
