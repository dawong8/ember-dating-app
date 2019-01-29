const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userController = require('./controllers/userController');
const session = require('express-session');

require('./db/db');


app.use(session({
  secret: "THIS IS THE SESSION MESSAGE",
  resave: false,
  saveUninitialized: false
}));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userController)


app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.get('/preferences', (req, res) => {
	res.render('users/preferences.ejs')
});


app.listen(3000, () => {
	console.log('app is listening');
});
