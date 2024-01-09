const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bioSchema = new Schema({
    username:{
        type: String,
    },
    user_id:{
        type: String,
    },
    photo:{
        type: String,
    },
    name:{
        type: String,
    },
    theme:{
        type: String,
    },
    links:{
        type: Array,
    },
    description:{
        type: String
    }
},
{timestamps: true})

module.exports = mongoose.model('bio', bioSchema)
