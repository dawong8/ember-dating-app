const mongoose = require('mongoose');

const userSchema = mongoose.Schema();
userSchema.add({
  username: String,
  password: String, 
  name: String, 
  about: String,
  age: Number, 
  gender: String, 
  userPreference: [ userSchema ],  // minUser, maxUser
  preferredDates: [ String ], //dates type stored as Strings 
  picture: String, 
  likedUsers: [ userSchema ]

  //pictures ?
});


module.exports = mongoose.model('User', userSchema);
