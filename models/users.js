const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String, 
  name: String, 
  age: Number, 
  gender: String, 
  userPreference: [ userSchema ], 
  preferredDates: [ String ], //dates type stored as Strings 
  picture: String, 
  likedUsers: [ userSchema ]

  //pictures ?
});

module.exports = mongoose.model('User', userSchema);
