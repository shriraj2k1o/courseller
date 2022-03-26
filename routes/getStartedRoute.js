const {Router} = require('express')
const router = Router()

router.get('/',(req,res)=>{
    const user = res.locals.user 
    if(user){
        res.redirect('/home')
    }else{
        res.render('login')
    }
})


module.exports = router