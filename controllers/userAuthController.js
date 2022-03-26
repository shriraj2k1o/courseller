const User = require('../models/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
// user_login           user_register


const user_login = async(req,res)=>{
    const {email,password} = req.body
    if(email!=='' && password!==''){
       try {
            const user = await User.login(email,password)
            const token = jwt.sign({user: user._id},process.env.JWT_SECRET)
            res.cookie('jwt',token,{ maxAge: 24*60*60*1000 , httpOnly: true})
            res.status(200).send({Info:"User LOGGED IN"})
       } catch (error) {
        res.status(400).send({Error: error.message})
           
       } 
    }else{
        res.status(400).send({Error: "Fill proper Credentials"})
    }

}

const user_register = async(req,res)=>{
    const {fullName, email,password} = req.body
    
    const responseBack = {fullName, email,password}

    if(fullName!=='' && email!=='' && password!==''){
        try {
            const userID = new mongoose.Types.ObjectId()
            const user = await User.create({_id: userID,fullName, email,password})
            const token = jwt.sign({user: user._id},process.env.JWT_SECRET)
            res.cookie('jwt',token,{ maxAge: 24*60*60*1000 , httpOnly: true})
            res.status(200).send({Info : "User Signed Up!"})

        } catch (error) {
            res.status(500).send({Error:error.message})
        }
    }
    else{
        res.status(400).send({Error: "Fill proper Credentials"})
    }
}


module.exports = {user_login, user_register}