const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var setSchema = new Schema({
  weight: {type: Number},
  reps: {type: Number},
  exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'},
});

setSchema
.virtual('calculated_one_rep_max')
.get(function() {
  return Math.floor((this.weight / ( 1.0278 - 0.0278 * this.reps )));
});

module.exports = mongoose.model('Set', setSchema);