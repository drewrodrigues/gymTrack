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
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })

// server *********************************************************************
app.listen(3000, function() {
  console.log('Port 3000: open for business')
})

// schema *********************************************************************
var Schema = mongoose.Schema

function required(v) {
  return v.length > 0
}

var exerciseSchema = new Schema({
  name: { type: String, validate: [required, 'Exercise name required'] },
  sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }]
})

var setSchema = new Schema({
  weight: { type: Number },
  reps: { type: Number },
  calculatedOneRepMax: { type: Number },
  exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' },
})

setSchema.methods.setCalculatedOneRepMax = function() {
  // TODO: make sure this runs prior to every save so it's always updated
  this.calculatedOneRepMax = Math.floor((this.weight / ( 1.0278 - 0.0278 * this.reps )))
}

// models *********************************************************************
var Exercise = mongoose.model('Exercise', exerciseSchema)
var Set = mongoose.model('Set', setSchema)

// routes *********************************************************************
// - exercises ****************************************************************
app.get('/exercises', (req, res) => {
  Exercise.find({}).
  populate('sets').
  exec(function(err, exercises) {
    if (err) {
      res.send(400, "Something went wrong")
    }
    console.log(exercises)
    res.send(exercises)
  })
})

app.post('/exercises', (req, res) => {
  const exercise = new Exercise({ name: req.body.name })
  exercise.save(function(err, exercise) {
    if (err) {
      res.send(400, "Something went wrong")
    } else {
      res.redirect('/exercises')
    }
  })
})

app.delete('/exercises/:id', (req, res) => {
  Exercise.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(400, "Something went wrong")
    }
    res.send('Success')
  })
})

app.put('/exercises/:id', (req, res) => {
  var exercise = Exercise.findById({ _id: req.params.id }, (err, exercise) => {
    if (err) {
      res.send(400, 'Something went wrong')
    } else {
      exercise.name = req.body.name
      exercise.save((error, ex) => {
        if (error) {
          res.status(400).send('Something went wrong')
        } else {
          res.send('Success')
        }
      })
    }
  })
})

// - sets *********************************************************************
app.get('/sets', (req, res) => {
  Set.find({}, (err, sets) => {
    if (err) {
      res.send(400, "Something went wrong")
    } else {
      res.send(sets)
    }
  })
})

app.post('/:exercise_id/sets', (req, res) => {
  // TODO: save both the set and the exercise, so when exercises are fetched
  // the set objects are persisted still. When the new 'set' is pushed into
  // the exercise.sets array, it only pushes the objectID, so the object must persist.
  // Then make sure the user interface updates when the change happens. 
  // TODO: don't allow calling for a specific set through a get request, only populate
  // through the parent 'exercise', which will later be scoped to a date.
  var exercise = Exercise.findById({ _id: req.params.exercise_id }, (err, exercise) => {
    if (err) {
      res.sendStatus(400)
    } else {
      var set = new Set({ weight: req.body.weight, reps: req.body.reps, exercise: req.params.exercise_id })
      set.setCalculatedOneRepMax()
      set.save()
      exercise.sets.push(set)
      exercise.save()
      res.send(set)
    }
  })
})

app.delete('/sets/:id', (req, res) => {
  Set.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.sendStatus(400)
    } else {
      res.send('Success')
    }
  })
})

app.put('/sets/:id', (req, res) => {
})