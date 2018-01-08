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
  let creator = null
  let name = request.params.name
    Jobs.findOne({name: name})
    .then( job =>{
      // console.log("user.email=>"+request.user.local.email)
      // console.log("creator =>"+ job.creator)

      //if the current User created the job, allow them to edit/delete
      if( request.user.local.email === job.creator)
        creator = true
      response.render('job-show', {job: job, creator: creator})
    })
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
  let name = request.params.name
    Jobs.findOneAndUpdate({name : name}, request.body.job, {new:true})
      .then(job => {
        response.redirect(`/jobs/${job.name}`)
      })
}

function removeJob(request, response) {
  let name = request.params.name
    Jobs.findOneAndRemove({name: name})
      .then( () => {
        response.redirect(`/jobs`)
      })
}

module.exports = {
  getJobs : getJobs,
  showJob : showJob,
  addJob  : addJob,
  updateJob : updateJob,
  removeJob : removeJob

}
