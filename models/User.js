const mongoose = require('mongoose')                    // MONGOOSE
const bcrypt = require('bcrypt')                        // BCrypt

const userSchema = new mongoose.Schema({
    _id: String,
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    course: [{
        _id: String,
        subject: String,
        classTime: String,
        fee: String,
        std: String,

    }]
    
})


userSchema.pre('save', async function (next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email})
    if(user){
        const result = await bcrypt.compare(password, user.password)
        if(result){
            return user
        }else{
            throw Error("Incorrect Password!")
        }
    }else {
        throw Error("NO Such User, Sign Up instead!")
    }
}

const User = mongoose.model('user', userSchema)

module.exports = User