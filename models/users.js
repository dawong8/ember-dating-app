const mongoose = require('mongoose');

const userSchema = mongoose.Schema();
userSchema.add({
  password: String, 
  name: String, 
  about: String,
  age: Number, 
  gender: String, 
  // userPreference: [ userSchema ],  // minUser, maxUser
  minAge: Number, 
  maxAge: Number, 
  preferredGender: String, 
  preferredDates: [ String ], //dates type stored as Strings 
  picture: String, 
  username: {type: String, unique: true},
  email: String,

  likedUsers: [ userSchema ]

  //pictures ?
});

const User = mongoose.model('User', userSchema);

module.exports = User;
