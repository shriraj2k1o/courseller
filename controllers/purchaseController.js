const User = require('../models/User')
const Transaction = require('../models/Trasaction')
const mongoose = require('mongoose')
//      purchase_get        purchase_post

const purchase_get = async(req,res)=>{
    const userID = res.locals.user 
    if(userID){
        try {
            const user = await User.findOne({_id: userID})
            res.render('purchase', {
                fullName: user.fullName,
                email: user.email
            })
        } catch (error) {
            console.log(error)
        }
    }else{
        res.redirect('/')
    }
}

const purchase_post = async(req,res)=>{
    const userID = res.locals.user 
    if(userID){
        console.log("user in")
        const {fullName,subject,cardNo,classTime,gender,age,fee,std} = req.body
        const emptyInput = Object.values({fullName,subject,cardNo,classTime,gender,age,fee,std}).every(value => {
            if(value!==''){
                return false
            }else{
                return true
            }
        })
        if(!emptyInput){
            try {
                const user = await User.findOne({_id: userID})
                const courseID = new mongoose.Types.ObjectId()
                const userUpdate = await User.updateOne({_id:userID},{
                    $push: {
                        course: {_id:courseID,subject,classTime,fee,std}
                    }
                })
                
                const transact = await Transaction.create({
                    userId: user._id,
                    email: user.email,
                    fullName,subject,cardNo,classTime,gender,age,fee,std,
                    courseId: courseID,
                    type: "BUY"
                })

                res.status(200).json({
                    std, subject
                })
        
            } catch (error) {
                console.log(error)
                res.status(500).send("NOT PUCHASED")
        
            }
        }else{
            res.status(400).json({
                msg: "Fill the form Correctly"
            })

        }
    
    
    }else{
        console.log("user out")

    }
}

module.exports = {purchase_get,purchase_post}