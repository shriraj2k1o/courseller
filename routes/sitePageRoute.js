const {Router} = require('express')
const router = Router()
const sitePages = require('../controllers/sitePageController')
router.get('/', sitePages.site_index)
router.get('/home',sitePages.site_home)

module.exports = router
