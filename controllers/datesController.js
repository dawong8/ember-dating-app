const express = require('express');
const router  = express.Router();
const Dates = require('../models/dates');

const multer  = require('multer');
const path = require('path');

router.get('/', async (req, res) => {

	try {
		const allDates = await Dates.find({});
		res.render('dates/index.ejs', {
			dates: allDates
		})

	} catch (err) {
		res.send(err); 
	}


});

// muelter ===============

const storage = multer.diskStorage({
	destination: '../public/uploads/', 
	filename: function(req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
	}
})


const upload = multer({
	storage: storage, 
	limits: {fileSize: 10}, 
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).single('picture'); 

function checkFileType(file, cb) {
	const filetypes = /jpeg|jpg|png|gif/;

	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

	const mimetype = filetypes.test(file.mimetype); 

	if (mimetype && extname) {
		console.log('corret file type');

		return cb(null, true);
	} else {
		cb('error!');
	}
}


router.post('/', async (req, res) => {
	try {
		const created = await Dates.create(req.body); 

		res.redirect('/dates');

	} catch (err) {
		res.send(err); 
	}
});




module.exports = router;
