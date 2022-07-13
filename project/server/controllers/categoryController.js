const Category = require('../models/category');
const { Op } = require("sequelize");


exports.getCategories = async(req, res, next) => {
    try{
        const categories = await Category.findAll()
        res.status(200).json({
            categories: categories
        })
    }catch(err) {
      console.log(err);
    };
};
