const mongoose = require('mongoose');

const userSchema = mongoose.Schema();
userSchema.add({
<<<<<<< HEAD
  username: {type: String, unique: true},
  email: String,
  password: String,
  name: String,
  age: Number,
  gender: String,
  preferredDates: [ String ],
  picture: String,
  about: String,
  minAge: Number, 
  maxAge: Number, 
  preferredGender: String,
=======
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

>>>>>>> profiles-again
  likedUsers: [ userSchema ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
