var Exercise = require('../models/Exercise')

exports.exercise_list = (req, res) => {
  Exercise.find({}, (err, exercises) => {
    if (err) {
      res.status(400).send(err)
    }
    res.send(exercises)
  })
}

exports.exercise_select = (req, res) => {
  Exercise.findById(req.params.id, (err, exercise) => {
    if (err) {
      res.status(400).send(err);
    }
    res.send(exercise)
  })
}

exports.exercise_create = (req, res) => {
  Exercise.create({name: req.body.name}, (err, exercise) => {
    if (err) {
      res.status(400).send(err)
    }
    res.send(exercise);
  })
}

exports.exercise_delete = (req, res) => {
  Exercise.deleteOne({_id: req.params.id}, (err) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send("Success")
  })
}

exports.exercise_update = (req, res) => {
  Exercise.findOneAndUpdate({_id: req.params.id}, {name: req.body.name}, {runValidators: true}, (err, exercise) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(exercise)
  })
}