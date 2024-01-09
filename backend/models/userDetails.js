const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userdetailsSchema = new Schema({
    user_id:{
        type: String,
    },
    photo:{
        type: String,
    },
    gender:{
        type: String,
    },
    location:{
        type: String,
    },
    name:{
        type: String,
    },
},
{timestamps: true})

module.exports = mongoose.model('userdetails', userdetailsSchema)