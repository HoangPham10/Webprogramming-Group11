const Product = require('../models/product');
const { Op } = require("sequelize");


exports.getFeaturedProducts = (req, res, next) => {
  Product.findAll({
    limit: 3,
    order: [
        ['price', 'DESC'],
    ],
    where: {
        quantity: {
            [Op.gt]: 0}
    }
  })
    .then(products => {
      res.status(200).json({
        featuredProduct: products
      })
    })
    .catch(err => {
      console.log(err);
    });
};



exports.getLatestProducts = (req, res, next) => {
    Product.findAll({
      limit: 8,
      order: [
          ['createdAt', 'DESC'],
      ],
      where: {
          quantity: {
              [Op.gt]: 0}
      }
    })
      .then(products => {
        res.status(200).json({
          latestProduct: products
        })
      })
      .catch(err => {
        console.log(err);
      });
  };



  exports.getProducts = async(req, res, next) => {
    try{
      const {page, brands, Price, Sort} = req.body
      const products = await Product.findAll({
        order: [
            ['price', Sort],
        ],
        where: {
          category_id: brands,
          [Op.and]: [
            {price: {[Op.gt]: Price.low}},
            {price: {[Op.lt]: Price.high}}
          ]
        }
      })
      res.json({
        products: page === 0 ? products.slice(0, 9) :  products.slice((page - 1)*9, (page - 1)*9 + 9),
        numPages: products.length % 9 == 0 ? products.length / 9 : parseInt(products.length/9 + 1) ,
        currentPage:  page == 0 ? 1 : page
      })
    }catch(err) {
        console.log(err);
    };
  };


  exports.getProduct = async(req,res,next) =>{
    try{
      const {id} = req.params
      res.json({
        product: await Product.findOne({
          where:{
            id: id
          }
        })
      })
    }catch(err){
      console.log(err)
    }
    
  }

  exports.getAllProducts = async(req,res,next) =>{
    try{
      res.json({
        products: await Product.findAll()
      })
    }catch(err){
      console.log(err)
    }
    
  }

  exports.deleteProduct = async(req,res,next) =>{
    const {id} = req.params
    await Product.destroy({
      where:{
        id: id
      }
    })
    try{
      res.json({
        products: await Product.findAll()
      })
    }catch(err){
      console.log(err)
    }
    
  }

  