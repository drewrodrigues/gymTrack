var express = require('express')
var router = express.Router()
var ExercisesController = require('../controllers/ExercisesController')

router.get('/', ExercisesController.exercise_list)
router.get('/:id', ExercisesController.exercise_select)
router.post('/', ExercisesController.exercise_create)
router.post('/:id/delete', ExercisesController.exercise_delete)
router.post('/:id/update', ExercisesController.exercise_update)

module.exports = router