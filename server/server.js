const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// config *********************************************************************
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// database *******************************************************************
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

// server *********************************************************************
app.listen(3000, function() {
  console.log('Port 3000: open for business');
})

// schema *********************************************************************
var Schema = mongoose.Schema;

function required(v) {
  return v.length > 0;
}

var exerciseSchema = new Schema({
  name: { type: String, validate: [required, 'Exercise name required'] },
  sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }]
});

exerciseSchema.path('name').validate(function(value) {
  return value != null;
}, 'Exercise name required');

var setSchema = new Schema({
  weight: { type: Number, validate: [required, 'Weight required'] },
  reps: { type: Number, validate: [required, 'Reps required'] },
  exercise: { 
    type: Schema.Types.ObjectId, ref: 'Exercise', 
    validate: [required, 'Exercise required']
  }
});

// models *********************************************************************
var Exercise = mongoose.model('Exercise', exerciseSchema);
var Set = mongoose.model('Set', setSchema);

// routes *********************************************************************
// - exercises
app.get('/exercises', (req, res) => {
  Exercise.find({}, function(err, exercises) {
    if (err) {
      res.send(400, "Something went wrong");
    }
    res.send(exercises);
  })
})

app.post('/exercises', (req, res) => {
  const exercise = new Exercise({ name: req.body.name });
  exercise.save(function(err, exercise) {
    if (err) {
      res.send(400, "Something went wrong");
    } else {
      res.redirect('/exercises');
    }
  });
})

app.delete('/exercises/:id', (req, res) => {
  Exercise.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.send(400, "Something went wrong");
    }
    res.send('Success');
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