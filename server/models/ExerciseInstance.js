var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ExerciseInstanceSchema = new Schema({
  exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'},
  day: {type: Schema.Types.ObjectId, ref: 'Workout'}
})

module.exports = mongoose.model('ExerciseInstance', ExerciseInstanceSchema)