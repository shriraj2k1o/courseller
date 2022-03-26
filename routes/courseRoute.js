const {Router} = require('express')
const router = Router()
const courseController = require('../controllers/courseController')
router.get('/',courseController.course_get)
router.put('/', courseController.course_put)
router.delete('/', courseController.course_delete)

module.exports = router