/*
Mongoose schema for the Volunteer Jobs
*/
var mongoose = require('mongoose')

var Job = mongoose.Schema({
  creator: String,
  name: String,
  date: String,
  location: String,
  description: String,
  time: String,
  //FIX eventually this should be an array of volunteers
  volunteer: String
})

module.exports = mongoose.model('Job', Job)
