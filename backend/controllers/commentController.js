const Comment = require('../models/commentModel')

const getCommentsByUserId = async (req, res) =>{
    const {id} = req.params.id
    try{
        const comment = await Comment.find({user_id:id})
        res.status(200).json(comment)
        console.log(comment)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}

const getCommentsByProjectId = async (req, res) =>{
    const {id} = req.params
    try{
        const comment = await Comment.find({project_id:id})
        res.status(200).json(comment)
        console.log(comment)
    }catch(error){
        res.status(400).json({error : error.message})
        console.log(error)
    }
}

  const CreateComment = async (req, res) => {
    const {user_id, project_id} = req.params
    const {commenter_id, body} = req.body

    try {
        const comment = await Comment.create({user_id, project_name,commenter_id, body})
        res.status(200).json(projects);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };



module.exports = {
    getCommentsByProjectId,
    getCommentsByUserId,
    CreateComment
}