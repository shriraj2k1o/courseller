const {Router} = require('express')
const auth = require('../controllers/userAuthController')
const router = Router()

router.post('/login',auth.user_login)
router.post('/register', auth.user_register)

module.exports = router