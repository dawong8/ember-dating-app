const mongoose = require('mongoose');

const userSchema = mongoose.Schema();
userSchema.add({
  username: String,
  email: String,
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

const User = mongoose.model('User', userSchema);

module.exports = User;
