require('dotenv').config()
const jwt = require('jsonwebtoken')


const userVerify = async(req,res,next) => {
    try {
        
        const token = req.cookies.jwt 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        res.locals.user = decoded.user
    } catch (error) {
        res.locals.user = null
        
    }


    next()
}


module.exports = userVerify