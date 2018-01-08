const Jobs        = require('../models/job')
var passport         = require("passport")

function getJobs(request, response) {
  Jobs.find({})
      .then((jobsData) => {
          response.render('jobs.hbs',{
              jobs: jobsData
          })
      })
      .catch((err) => {
          console.log(err)
      })
}

function showJob(request, response) {

}

function addJob(request, response) {
  Jobs.create(request.body.job)
    .then( job => {
      // if the job exists then go to the job page
      //response.redirect(`/jobs/${job.name}`)
      response.redirect('/jobs')
    })
}

function updateJob(request, response) {

}

function removeJob(request, response) {

}

module.exports = {
  getJobs: getJobs,
  // showjob : showjob,
   addJob : addJob,
  // updatejob : updatejob,
  // removejob : removejob

}
