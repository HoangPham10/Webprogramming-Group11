const User = require('../models/user')
const jwt = require('jsonwebtoken')

const authAdmin = async(req, res , next)=>{
    try{
        let {username } = req.user.username
        if(!username){
            username = req.user.username
        }

        const user = await User.findOne({
            where:{
                username: username
            }
        })
        console.log(user)
        if(user.role !== 'admin') return res.status(400).json({msg: "Admin resources access denied"})
        next();
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}


module.exports = authAdmin