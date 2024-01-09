const express = require('express')
const router = express.Router()
const {getInfo, deleteUser, changePassword, editDetails} = require('../controllers/userController')
const Auth = require('../middlewear/requireAuth')
router.use(Auth)
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const User = require('../models/userModel')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null,uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    /*const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];*/
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });



router.put('/userphoto',upload.single('photo'), async(req, res) => {
    const _id = req.user._id
    const url = req.protocol + '://' + req.get('host')
    const photo = url + '/images/' + req.file.filename;
try{
    const user = await User.findByIdAndUpdate(_id, {photo})
    res.status(200).json(user)
}catch(error){
    res.status(400).json({error : error.message})
    console.log(error)
}
});

router.get('/details/:id', getInfo)

router.post('/details/:id', editDetails)

router.delete('/:id', deleteUser)

router.post('/passwordchange/:id', changePassword)

module.exports = router
