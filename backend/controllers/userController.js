const User = require('../models/userModel')
const UserDetails = require('../models/userDetails')
const bcrypt = require('bcrypt')

const editDetails = async (req, res) =>{
    const _id = req.params.id
    try{
     const project = await UserDetails.findByIdAndUpdate(_id,{...req.body})
        res.status(200).json(project)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}



const getInfo = async (req, res) =>{
    const user_id = req.params.id
    try{
        const user = await UserDetails.findOne({user_id:user_id})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}


//delete a word
const deleteUser = async (req, res) =>{
    const user_id = req.user._id
    try{
        const deletedUser = await User.findOneAndDelete({_id: user_id})
        if(deletedUser){
            console.log('resume deleted')
            res.status(200).json(true)
        }
        if(!deletedUser){
            res.status(200).json(false)
        }
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})

    }
}

/*const addTestimony = async (req, res) => {
    const user_id = req.user._id
    const {body, profession, name, surname} = req.body
    try{
        const user = await User.findOne({_id:user_id})
        let photo = user.photo
        const testimony = await Testimony.create({user_id,name,surname,profession, photo})
        res.status(200).json(testimony)
        console.log(testimony)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}

const deleteTestimony = async (req, res) =>{
    const user_id = req.user._id
    try{
        const test = await Testimony.findOneAndDelete({_id: user_id})
        if(test){
            res.status(200).json(true)
        }
        if(!test){
            res.status(200).json(false)
        }
    }catch(error){
        console.log(error)
        res.status(400).json({error: error.message})

    }
}

const getTestimony = async (req, res) =>{
    const user_id = req.user._id
    try{
        const testimony = await Testimony.findOne({_id:user_id})
        res.status(200).json(testimony)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}*/

const changePassword = async (req, res) =>{
    const _id = req.params.id
    const {newPassword, oldPassword} = req.body
    const user = await User.findOne({_id})
    if(!user){
        throw Error('user not exist')
    }
    const match = await bcrypt.compare(oldPassword, user.password)
    if(!match){
        throw Error('passwords dont match')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    try{
        const newpassword = await User.findByIdAndUpdate(_id, { password: hash })
        res.status(200).json(newpassword)
        console.log('pwd changed')
    }catch(error){
        res.status(400).json({error : error.message})
    }
}



module.exports = {
    getInfo,
    deleteUser,
    changePassword,
    editDetails
}