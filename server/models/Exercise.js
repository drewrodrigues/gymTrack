const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
  name: {type: String, required: [true, 'Name is required']},
  image_url: {type: String}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);