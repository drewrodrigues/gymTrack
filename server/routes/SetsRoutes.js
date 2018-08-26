var express = require('express')
var router = express.Router()
var SetsController = require('../controllers/SetsController')

router.get('/', SetsController.set_list)
router.get('/:id', SetsController.set_select)
router.post('/', SetsController.set_create)
router.post('/:id/delete', SetsController.set_delete)
router.post('/:id/update', SetsController.set_update)

module.exports = router