const {Router} = require('express')
const router = Router()


router.get('/', (req,res)=>{
    
    const user = res.locals.user 
    if(user){
        res.cookie('jwt','lol',{maxAge: 1})
        res.redirect('/')
    }else{
        res.redirect('/')

    }
})


module.exports = router