var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var WorkoutSchema = new Schema({
  date: {type: Date, required: true, default: Date.now},
  duration: {type: Number}
})

WorkoutSchema
.virtual('total_sets')
.get(function() {
  // TODO:
})

WorkoutSchema
.virtual('total_reps')
.get(function() {
  // TODO:
})

WorkoutSchema
.virtual('total_weight')
.get(function() {

})

module.exports = mongoose.model('Workout', WorkoutSchema)