const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
}, {timestamps: true})

// so wehem call json noone see password (for now its error)
userSchema.set('toJson', {
    transform: (document, returnedObject) => {
        delete returnedObject.password
    }
})


const User = mongoose.model('User' , userSchema)

module.exports = User