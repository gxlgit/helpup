/*
Mongoose schema for the user profile
*/
var mongoose = require('mongoose')

var Profile = mongoose.Schema({
  address   : String,
  phone     : String,
  interests : [String],
})

module.exports = mongoose.model('Profile', Profile)
