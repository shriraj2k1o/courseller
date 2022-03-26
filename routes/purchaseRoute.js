const {Router} = require('express')
const router = Router()


const purchaseController = require('../controllers/purchaseController')
router.get('/',purchaseController.purchase_get)
router.post('/',purchaseController.purchase_post)

module.exports = router