const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const userController = require('./controllers/userController');

require('./db/db');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.listen(3000, () => {
	console.log('app is listening');
});
