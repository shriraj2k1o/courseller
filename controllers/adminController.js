
//          admin_get       admin_post      
//          adminDashboard_get
const Admin = require('../models/Admin')
const Transaction = require('../models/Trasaction')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const admin_get = (req,res) => {
    userID = res.locals.user 
    if(userID){
        res.send("User logged in")
    }else{
        res.render('adminLogin', {layout:'admin'})
    }
}

const admin_post = async(req,res)=>{
    
    const {email, password} = req.body
    if(email!=='' && password!==''){
        try {
            const user = await Admin.login(email,password)
            const token = jwt.sign({user: user._id},process.env.JWT_SECRET)
            res.cookie('jwt',token,{ maxAge: 24*60*60*1000 , httpOnly: true})
            res.status(200).send({Info:"ADMIN LOGGED IN"})
        } catch (error) {
            res.status(400).send({Error: error.message})
        }
        

    }else{
        res.status(400).send({Error: "Fill Proper Credentials"})
    }

}

const adminDashboard_get = async(req,res)=>{
    const userID = res.locals.user 
    if(userID){
        try {
            const transactions = await Transaction.find()
            let history=[]
            transactions.forEach( transaction => {
                const data = {
                    name : transaction.fullName,
                    email : transaction.email,
                    gender : transaction.gender,
                    age : transaction.age,
                    subject : transaction.subject,
                    classTime : transaction.classTime,
                    std : transaction.std,
                    fee : transaction.fee,
                    bought : transaction.createdAt,
                    update: transaction.updatedAt,
                    type: transaction.type
                }

                history.push(data)
            } )

            if(history.length !==0){

                res.render('adminDashboard', {layout: 'admin', history})
                
            }else{
                let Error = "No Transaction occurred!"
                res.render('adminDashboard', {layout: 'admin', Error})
            }

            
        } catch (error) {
            
            res.render('adminDashboard', {layout: 'admin', Error: error.message})
        }
    }else{
        res.redirect('/admin')
    }
}

module.exports = {admin_get,admin_post, adminDashboard_get}