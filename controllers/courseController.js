const User = require('../models/User')
const Transaction = require('../models/Trasaction')
// course_get      course_put (update)        course_delete

const course_get = async(req,res)=>{
    const userID = res.locals.user 
    if(userID){
        try {
            const user = await User.findOne({_id: userID}).lean()
            let courses = user.course

            if(courses.length !== 0){
                
                res.render('courses',{courses})
            }else{
                
                let msg = "YOU HAVE NO COURSES, BUY NEW!"
                res.render('courses',{msg})
            }
            
        } catch (error) {
            console.log(error)
            res.render('courses',{msg: "Error Occured"})
        }
    }else{
        res.redirect('/')
    }
}

const course_put = async(req,res)=>{
    const userID = res.locals.user 
    if(userID){
        const {courseID, classTime} = req.body
        try {
            const updateCourse = await User.findOneAndUpdate({_id: userID, course: {$elemMatch: {_id: courseID}}},{
               'course.$.classTime': classTime
             
            }, {
                new: true, upsert: true
            }).exec()

           const updateTransaction = await Transaction.findOneAndUpdate({courseId: courseID, type: "BUY"},{
               'classTime': classTime
           })

            res.status(200).send({Info:"Class Time Updated! ",id:courseID})
        } catch (error) {
            console.log(error)
            res.status(400).send({Error:error.message})
        }
        
    }else {
        res.redirect('/')
    }
}
const course_delete = async(req,res)=>{
    const userID = res.locals.user 
    if(userID){
        const {courseID}= req.body
        try {
           
            const deleteCourse = await User.findOneAndUpdate({_id: userID},{
                $pull : {
                    course: {
                        _id: courseID 
                    }
                }
            }, {
                new: true
            }).exec()

            const deleteTransaction = await Transaction.findOneAndUpdate({courseId:courseID, type:"BUY"},{
                type: "CANCEL"
            }).exec()


            res.status(200).send({Info:"Course DELETED! ",id:courseID})
        } catch (error) {
            console.log(error)
            res.status(400).send({Error:error.message})

        }
        
    }else {
        res.redirect('/')
    }
}

module.exports = {course_get, course_put, course_delete}