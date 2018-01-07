var passport = require("passport")

function getSignup(request, response, next) {
  response.render('signup.hbs', { message: request.flash('signupMessage') })
}

function postSignup(request, response, next) {
   var signupStrategy = passport.authenticate('local-signup', {
     successRedirect : '/',
     failureRedirect : '/signup',
     failureFlash : true
   })

   return signupStrategy(request, response, next)
 }

function getLogin(request, response, next) {
  response.render('login.hbs', { message: request.flash('loginMessage') })
}

function postLogin(request, response, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  })

  return loginProperty(request, response, next)
}


function getLogout(request, response, next) {
  request.logout()
  response.redirect('/')
}

// Restricted page
function secret(request, response){
    response.render("secret.hbs")
  }

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
}
