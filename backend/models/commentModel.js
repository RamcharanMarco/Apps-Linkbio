const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    project_name:{
        type: String,
        required: true
    },
    commenter_id:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
},
{timestamps: true})

module.exports = mongoose.model('comment', commentSchema)