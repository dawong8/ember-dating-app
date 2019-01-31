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


		res.redirect(`/user/${req.params.id}/ready`);
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
		res.redirect(`/user/${req.params.id}/ready`);
	}catch (err) {
		res.send(err);
	}
});


router.get('/:id/ready', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);

		const potential = await Users.find(
			{ 
				preferredDates: 
					{ $in: profile.preferredDates }, 
				gender: 
					{ $in: profile.preferredGender}, 
				age: 
					{ $gte: profile.minAge, 
					  $lte: profile.maxAge},
				minAge: 
					{
						$lte: profile.age
					},
				maxAge: 
					{
						$gte: profile.age
					},
				preferredGender: profile.gender,

				_id: 
					{ $ne: profile._id }

				// not already in 

			});

		profile.availableUsers = potential;
		const data =  await profile.save();


		res.render('main/ready.ejs', {
			user: profile
		});
	} catch (err) {
		res.send(err);
	}
});


// ============= Match =============

router.get('/:id/match', (req, res) => {
	res.render('main/match.ejs');

});


// ============== Main =================

router.get('/:id/main', async (req, res) => {
	try {
		const profile = await Users.findById(req.params.id);

		if (profile.availableUsers.length > 0) {

			res.render('main/swipe.ejs', {
				user: profile, 
				match: profile.availableUsers[0]
			})
		} else {
			res.render('main/nodates.ejs', {
				user: profile
			})
		}

		//console.log(profile);

	} catch (err) {
		res.send(err);
	}
});




router.put('/main/:id', async (req, res) => {
	try {

		const profile = await Users.findById(req.params.id);
		console.log('PROFILE', profile);

		const temp = profile.availableUsers.shift();
		console.log('TEMP ================= ', temp)
		const data = await profile.save();

		if (req.body.match === 'like') {
			profile.likedUsers.push(temp);
			const liked = await profile.save();
			console.log('LIKED ============== ', liked)

			let matched = false;
			for (let a = 0; a < temp.likedUsers.length; a++) {
				console.log('BEFORE IF =====================');
				console.log('MATCHED ===================== ', matched);
				if (temp.likedUsers[a]._id.toString().trim() == profile._id.toString().trim()) {
				// if (1 == 1) {
					console.log('IN IF =====================');
					console.log('FOUND A MATCH');
					matched = true;
				}
				console.log('temp users ' + temp.likedUsers[a]._id);
				console.log('profile ' + profile._id);
			
			}
			// const match = temp.likedUsers.find( (element) => {
			// 	if (element === profile) {
			// 		console.log('FOUND A MATCH');
			// 		return element;
			// 	} else {
			// 		console.log('NOT A MATCH');

			// 		return null;
			// 	}
			// });
			console.log('Match is ' + matched);

			if (matched) {
				res.redirect(`/user/${profile._id}/match`);
			}

		} else if (req.body.match === 'pass') {

			// do nothing 
		}





		res.redirect(`/user/${profile.id}/main`);


	} catch (err) {
		res.send(err);
	}
});







module.exports = router;
