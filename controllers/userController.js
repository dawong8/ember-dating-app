const express = require('express');
const router  = express.Router();
const Users = require('../models/users');
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
		console.log("here?");
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





// Edit Entire User
router.get('/:id/full', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);
		
	} catch (err) {
		res.send(err); 
	}
});



module.exports = router;
