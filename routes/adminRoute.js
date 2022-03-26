const {Router} = require('express')
const router = Router()
const adminController = require('../controllers/adminController')

router.get('/', adminController.admin_get)
router.post('/', adminController.admin_post)

router.get('/dashboard',adminController.adminDashboard_get)
module.exports = router