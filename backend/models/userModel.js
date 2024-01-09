const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
    },
    username:{
        type: String,
    },
    password:{
        type: String,
    },
},
{timestamps: true})

module.exports = mongoose.model('user', userSchema)