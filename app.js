const express      = require('express')
const app          = express()
const mongoose     = require('mongoose')
const passport     = require('passport')
const flash        = require('connect-flash')
const hbs          = require("hbs")
const morgan       = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser   = require('body-parser')
const session      = require('express-session')

mongoose.connect('mongodb://localhost/helpup')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'hbs')
app.set("views","./views") 
app.use(express.static(__dirname + '/public'))

app.use(session({ secret: 'WDI-PROJECT2-HELPUP' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./config/passport')(passport)
app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  next()
})

var routes = require('./config/routes')
app.use(routes)

app.listen(6060)
