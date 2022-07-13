const Review = require('../models/review');
const { Op } = require("sequelize");


exports.postReview = async(req, res, next) => {
    try{
        const {username,product_id,content,rating} = req.body;
        await Review.create({
            username,
            product_id,
            content,
            rating
        })
        console.log(req.body)


        res.json({
          reviews: await Review.findAll({
            where:{
              product_id
            }
          })
      })
    }catch(err) {
      console.log(err);
      res.json({msg: 'Cannot post revieew'})
    };
};

exports.getReviews = async(req,res,next) =>{
    try{
      const {id} = req.params
      res.json({
        reviews: await Review.findAll({
          where:{
            product_id: id
          }
        })
      })
    }catch(err){
      console.log(err)
    }
}