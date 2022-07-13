const User = require('../models/user');
const Cart = require('../models/cart')
const Product = require('../models/product')

const { Op, Sequelize } = require("sequelize");
const bcrypt = require('bcrypt')
const jwt = require('../utils/jsonwebtoken')
const jsonWebToken = require('jsonwebtoken')
const sequelize = require('../configs/database');


exports.Register =  async(req, res, next) =>  {
    try{
        const {username,name, email, password, address, phone} = req.body;
        const user = await User.findAll({
            where: {
                [Op.or]: [{ username: username }, { email: email }],
            }
        })
        if(user.length > 0) return res.json({msg: "The email or username already exists."})
        if(password.length < 6) return res.json({msg: "Password is at least 6 characters long"})

        const passwordHash = await bcrypt.hash(password, 10);

        
        const newUser = await User.create({
            username,
            password: passwordHash,
            name:name,
            email: email,
            address: address,
            phone: phone,
            role: 'user'
        });
        res.json({msg: "Register Successfully"})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

exports.refreshToken = async(req, res, next) => {
    try{
        const rf_token = req.cookies.refresh_token;
        console.log(rf_token)
        if(!rf_token){
            return res.json({msg:"Please Login or Register"})
        }
        jsonWebToken.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, username) => {
            console.log('username', username)
            if (err) return res.json({msg:"Please Login or Register"});
            const accesstoken = jwt.createAccessToken({username: username})
            res.json({accesstoken})
        })
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

exports.getUser = async(req, res, next) => {
    try{
        const {username } = req.user.username
        const user = await User.findOne({
            where:{
                username: username
            }
        })
        if (!user)  return res.status(400).json({msg: "User does not exist"})
        res.json(user)
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}



exports.Login =  async(req, res, next) =>  {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({
            where: {
                username: username
            }
        });
        if(!user) return res.json({msg: 'User does not exist.'});

        

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({msg: "Incorrect password"});

        const accessToken = jwt.createAccessToken({username: username});
        const refreshToken = jwt.createRefreshToken({username: username});

        res.cookie('refresh_token', refreshToken,{
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7*24*60*60*1000 // 7d
        })
        console.log(refreshToken)

        console.log(req.cookies)


        res.json({
            accessToken,user
        })

    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}



exports.Update =  async(req, res, next) =>  {
    try{
        const {username,name, email, password, address, phone} = req.body;
        if(password.length < 6) return res.json({msg: "Password is at least 6 characters long"})

        const passwordHash = await bcrypt.hash(password, 10);

        
        const updatedUser = await User.update({
            password: passwordHash,
            name,
            email,
            address, 
            phone
        }, {
            where: {
              username: username
            }
        });
        
        res.json({username,name, email, address, phone, msg: "Update Successfully"} )
        

    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

exports.logout = async(req, res, next) => {
    try{
       res.clearCookie('refresh_token', {path: '/user/refresh_token'})
       return res.json({msg: "Logged out"})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}



exports.addToCart = async(req, res, next) => {
    try{
        const {username, product} = req.body
        // Update quantity in product
        const productDB = await Product.findOne({
            where:{
                id: product.id
            }
        })
        if(productDB.quantity === 0){
            return res.json({msg: "Not enough products"})
        }
        await Product.update({quantity: product.quantity - 1},{
            where:{
                id: product.id
            }
        })
        //Update carts
        const cart = await Cart.findOne({
            where:{
                username: username,
                product_id: product.id
            }
        })
        if (cart){
            // Product exists in carts
            await Cart.update({quantity: cart.quantity + 1},{
                where:{
                    username: username,
                    product_id: product.id
                }
            })
        }else{
            // Product does not exist in carts
            await Cart.create({
                username: username,
                product_id: product.id,
                quantity: 1
            })
        }
        return res.json({
            cart: await sequelize.query(`SELECT DISTINCT carts.username, carts.product_id, carts.quantity, products.name, products.image, products.price  FROM carts,products where carts.product_id = products.id and carts.username = \"${username}\"`,{type: sequelize.QueryTypes.SELECT})
        })
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}




exports.decreaseToCart = async(req, res, next) => {
    try{
        const {username, product} = req.body
        // Update quantity in product
        const cardDB = await Cart.findOne({
            where:{
                product_id: product.id,
                username: username
            }
        })
        if(cardDB.quantity == 1){
            await Cart.destroy({
                where:{
                    product_id: product.id,
                    username: username
                }
            })
        }else{
            console.log(product.quantity)
            await Cart.update({quantity: product.quantity-1},{
                where:{
                    product_id: product.id,
                    username: username
                }
            })
        }
        const productDB = await Product.findOne({
            where:{
                id: product.id
            }
        })
        await Product.update({quantity: productDB.quantity + 1},{
            where:{
                id: productDB.id
            }
        })
        
        return res.json({
            cart: await sequelize.query(`SELECT DISTINCT carts.username, carts.product_id, carts.quantity, products.name, products.image, products.price  FROM carts,products where carts.product_id = products.id and carts.username = \"${username}\"`,{type: sequelize.QueryTypes.SELECT})
        })
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}




exports.removeToCart = async(req, res, next) => {
    try{
        const {username, product} = req.body
        // Update quantity in product
        const x = await Cart.destroy({
            where:{
                product_id: product.id,
                username: username
            }
        })
        const productDB = await Product.findOne({
            where:{
                id: product.id
            }
        })
        await Product.update({quantity: productDB.quantity + product.quantity},{
            where:{
                id: productDB.id
            }
        })
        
        return res.json({
            cart: await sequelize.query(`SELECT DISTINCT carts.username, carts.product_id, carts.quantity, products.name, products.image, products.price  FROM carts,products where carts.product_id = products.id and carts.username = \"${username}\"`,{type: sequelize.QueryTypes.SELECT})
        })
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}