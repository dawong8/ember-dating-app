const mongoose = require('mongoose');

const connectionString = 'mongodb://heroku_3806x23j:u1t3fpqeb7pnkh9qn6jbeknas8@ds219055.mlab.com:19055/heroku_3806x23j';

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});


mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ', connectionString);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose error ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from ', connectionString);
});