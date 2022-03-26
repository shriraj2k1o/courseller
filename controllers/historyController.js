//          history_get
const Transaction = require('../models/Trasaction')

const history_get = async(req,res)=>{
    const user = res.locals.user 
    if(user){
        const transactions = await Transaction.find({userId: user})
        const history= []
        transactions.forEach(transaction => {
            const data = {
                name: transaction.fullName,
                email: transaction.email,
                cardNo: transaction.cardNo,
                subject: transaction.subject,
                std: transaction.std,
                fee: transaction.fee ,
                timestamp: transaction.createdAt
            }
            history.push(data)
        })

        if(history.length !==0){

            res.render('history', {
                history
            })
        }else{
            let msg = "You bought no course, buy now!"
            res.render('history',{msg})
        }
    }else{
        res.redirect('/')
    }
}

module.exports = {history_get}