var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var passport = require("passport")
var usersController = require('../controllers/users')
var staticsController = require('../controllers/statics')
var jobsController = require('../controllers/jobs')

function authenticatedUser(req, res, next) {
    // If the user is authenticated, then we continue the execution
    if (req.isAuthenticated()) return next()

    // Otherwise the request is always redirected to the home page
    res.redirect('/')
  }

router.route('/')
  .get(staticsController.home)

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route("/logout")
  .get(usersController.getLogout)

router.route('/jobs')
   .get(authenticatedUser, jobsController.getJobs)
   .post(authenticatedUser, jobsController.addJob)

router.route('/jobs/:name')
    .get(authenticatedUser, jobsController.showJob)
    .post(authenticatedUser, jobsController.updateJob)

router.route('/jobs/:name/delete')
    .post(authenticatedUser, jobsController.removeJob)

router.route('/jobs/:name/removeVolunteer')
    .post(authenticatedUser, jobsController.removeVolunteer)

router.route('/jobs/:name/addVolunteer')
    .post(authenticatedUser, jobsController.addVolunteer)

module.exports = router
