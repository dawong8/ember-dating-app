const express = require('express');
const router  = express.Router();

const Users = require('../models/users');


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

router.put('/looking/:id', async (req, res) => {
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


module.exports = router;