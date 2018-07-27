const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// config *********************************************************************
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

// database *******************************************************************
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

// server *********************************************************************
app.listen(3000, function() {
  console.log('Port 3000: open for business');
})

// models *********************************************************************
var Exercise = mongoose.model('Exercise', { name: String });

// routes *********************************************************************
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


app.get('/exercises', (req, res) => {
  Exercise.find({}, function(err, exercises) {
    if (err) {
      console.log(err);
    }
    res.send(exercises);
  })
})

app.post('/exercises', (req, res) => {
  console.log(req.body);
  const exercise = new Exercise({ name: req.body.name });
  exercise.save();
  res.redirect('/exercises');
})

app.delete('/exercises/:id', (req, res) => {
  Exercise.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
    }
    res.send('success');
  })
})