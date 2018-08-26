const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// config *********************************************************************
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// database *******************************************************************
mongoose.connect('mongodb://localhost:27017/rep_track', { useNewUrlParser: true })

// server *********************************************************************
app.listen(3000, function() {
  console.log('Port 3000: open for business')
})

// schema *********************************************************************
var Exercise = require('./models/Exercise')
var ExerciseInstance = require('./models/ExerciseInstance')
var Set = require('./models/Set')
var Workout = require('./models/Workout')

// routes *********************************************************************
var ExercisesRoutes = require('./routes/ExercisesRoutes')
// var SetsRoutes = require('./routes/SetsRoutes')
app.use('/exercises', ExercisesRoutes)
// app.use('/sets', SetsRoutes)