const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    email:{
        type: String
    },
    fullName: {
        type: String
    },
    cardNo: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: String
    },
    subject: {
        type: String
    },
    classTime: {
        type: String
    },
    fee: {
        type: String
    },
    std: {
        type: String
    },
    courseId: {
        type: String
    },
    type: {
        type: String
    }
    
}, {
    timestamps: true
})


const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction