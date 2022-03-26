const mongoose = require('mongoose')                    // MONGOOSE
const bcrypt = require('bcrypt')                        // BCrypt

const adminSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    
})


adminSchema.statics.login = async function(email,password) {
    const user = await this.findOne({email})
    if(user){
        const result = await bcrypt.compare(password, user.password)
        if(result){
            return user
        }else{
            throw Error("Incorrect Credentials!")
        }
    }else {
        throw Error("Invalid LOGIN!")
    }
}

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin