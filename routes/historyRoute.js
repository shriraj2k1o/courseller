const {Router} = require('express')
const router = Router()

const historyController = require('../controllers/historyController')
router.get('/',historyController.history_get)


module.exports = router