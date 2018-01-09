const User       = require('../models/user')
var passport         = require("passport")

function getProfile(request, response) {
  User.findOne({'local.email': request.user.local.email})
      .then((user) => {
          response.render('profile_person.hbs',{
              profile: user.local.profile
          })
      })
      .catch((err) => {
          console.log(err)
      })
}

function updateProfile(request, response) {
  console.log('profile=>'+request.body.profile.address)
  console.log('email=>'+request.user.local.email)
  User.findOneAndUpdate(
      {'local.email': request.user.local.email},
      {'local.profile': request.body.profile},
      // {'local.profile.address': request.body.profile.address,
      //  'local.profile.phone': request.body.profile.phone,
      //  'local.profile.interests': [request.body.profile.interests]},
     {new: true} )
      .then((user) => {
        console.log('user=>'+user)
          response.redirect('/profile')
      })
      .catch((err) => {
          console.log(err)
      })
}



module.exports = {
  getProfile : getProfile,
  updateProfile : updateProfile
  //removeProfile : removeProfile
}
