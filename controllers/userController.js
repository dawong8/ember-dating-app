const express = require('express');
const router  = express.Router();
const Users = require('../models/users');
const bcrypt  = require('bcryptjs');

// "admin" page --- to show all users 
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


// temporary delete page 

router.delete('/:id', (req, res) =>{
	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if (err) {
			res.send(err); 
		} else {
			res.redirect('/user');
		}
	});
});




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





// the type of dates you are looking for 

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




// the type of people you are looking for 

router.get('/:id/looking', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);
		res.render('users/looking.ejs', {
			user: profile
		});
	} catch (err) {
		res.send(err);
	}
});


router.put('/looking/:id', async (req, res) => {
	try {

		const profile = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});


		res.redirect(`/user/${req.params.id}/main`);
	} catch (err) {
		res.send(err);
	}
});





// Edit Entire User
router.get('/:id/full', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);
		res.render('users/fullEdit.ejs', {
			user: profile
		});
	} catch (err) {
		res.send(err);
	}
});

router.put('/full/:id', async (req, res) => {
	try {
		const profile = await Users.findByIdAndUpdate(req.params.id, req.body, {new:true});
		res.redirect(`/user/${req.params.id}/main`);
	}catch (err) {
		res.send(err);
	}
});








// ============== Main =================

router.get('/:id/main', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);


		const potential = Users.findOne(
			{ 
				age: 
					{ $gte : `${profile.minAge}` }, 
			
				gender: `${profile.preferredGender}`  


			});

		console.log('==========================');
		console.log('potential match is : ' + potential.age);
		console.log('==========================');

		res.render('main/swipe.ejs', {
			user: profile, 
			match: potential
		})
	} catch (err) {
		res.send(err);
	}
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


        res.redirect(`/user/${createdUser.id}/profile`);

        //successful login 

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

module.exports = router;
