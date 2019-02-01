const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const datesController = require('./controllers/datesController');



const session = require('express-session');

require('./db/db');

app.use(express.static('public'));

app.use(session({
  secret: "THIS IS THE SESSION MESSAGE",
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userController)
app.use('/auth', authController);
app.use('/dates', datesController);


app.get('/', (req, res) => {
	res.render('index.ejs', {message: req.session.message});
});





app.listen(3000, () => {
	console.log('app is listening');
});
