const Jobs        = require('../models/job')
var passport         = require("passport")

function getJobs(request, response) {
  Jobs.Job.find({})
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
  let volunteer = null
  let name = request.params.name

  Jobs.Job.findOne({name: name})
    .then( job =>{

       //console.log("user.email=>"+request.user.local.email)
      //console.log("creator =>"+ job.creator)

      //if the current User created the job, allow them to edit/delete
      if( request.user.local.email === job.creator ){
        creator = true
        //FIX IT eventually should give volunteer as an array of volunteer img, name, email
        //for now this is hard coded in
        response.render('job-show',
          {job: job, creator: creator, volunteer:volunteer})
      }
      //else check to see if they are currently a volunteer for the job
      else{
        //referenced code from https://stackoverflow.com/questions/13097266/querying-nested-documents-using-mongoose-mongodb
        Jobs.Job.find({name:name,'volunteers.email':request.user.local.email})
                    .then( volunteer =>{
                      response.render('job-show',
                      {job: job, creator: creator, volunteer:volunteer})
                    })
      }
    })
}

function addJob(request, response) {
  Jobs.Job.create(request.body.job)
    .then( job => {
      // if the job exists then go to the job page
      //response.redirect(`/jobs/${job.name}`)
      response.redirect('/jobs')
    })
}

function updateJob(request, response) {
  let name = request.params.name
    Jobs.Job.findOneAndUpdate({name : name}, request.body.job, {new:true})
      .then(job => {
        response.redirect(`/jobs/${job.name}`)
      })
}

function removeJob(request, response) {
  let name = request.params.name
    Jobs.Job.findOneAndRemove({name: name})
      .then( () => {
        response.redirect(`/jobs`)
      })
}

function removeVolunteer(request, response) {
  let name = request.params.name
  Jobs.Job.findOneAndUpdate(
        {name: name},
        { $pull: {volunteers: { email: request.user.local.email,
                                name:  request.user.local.name}
                              } })
                              .then( (job)=> {
                                      console.log('REMOVED ITEM: ' + job)
                                      response.redirect(`/jobs/${job.name}`)
                                    })
}


function addVolunteer(request, response) {
  let name = request.params.name
  console.log('adding=>'+request.user.local.name)
  Jobs.Job.findOneAndUpdate(
          {name: name},
          { $push: {volunteers: new Jobs.Volunteer({ email: request.user.local.email,
                                                     name:  request.user.local.name,
                                                     img:   request.user.local.profile.img})
                    }
          })
          .then( (job)=> {
                  console.log('ADDED Volunteer: ' + job)
                  response.redirect(`/jobs/${job.name}`)
                })
}




module.exports = {
  getJobs : getJobs,
  showJob : showJob,
  addJob  : addJob,
  updateJob : updateJob,
  removeJob : removeJob,
  addVolunteer: addVolunteer,
  removeVolunteer: removeVolunteer
}
