const Transaction = require('../models/transaction');
const Cart = require('../models/cart')
const { Op } = require("sequelize");
const sequelize = require('../configs/database');


exports.createTransactions = async(req, res, next) => {
    try{
        const {transaction_id,username,cart,payment_id,shipment_id} =  req.body
        cart.map(async(item, index) => {await Transaction.create({
            transaction_id,
            username,
            product_id: item.product_id,
            quantity: item.quantity,
            shipment_id,
            payment_id
        })})

        await Cart.destroy({
            where:{
                username: username
            }
        })
        res.json({msg: "Transaction records successfully"})
    }catch(err) {
      console.log(err);
    };
};



exports.getOrderHistory =  async(req, res, next) => {
    try{
        const {username} =  req.body

        const transaction = await sequelize.query(`
            SELECT 
	            transactions.transaction_id,
                transactions.createdAt,
                sum(products.price * transactions.quantity + shipments.fee) as total_bill,
                users.address,
                users.phone,
                shipments.description as shipment_description,
                payments.description as payment_description
            FROM 
                transactions,products, users, shipments, payments
            WHERE transactions.product_id = products.id and users.username = transactions.username and transactions.shipment_id = shipments.id and transactions.payment_id = payments.id and transactions.username = \"${username}\"
            GROUP BY transactions.transaction_id;`, {type: sequelize.QueryTypes.SELECT});
        res.json({
            transaction : transaction
        })
    }catch(err) {
      console.log(err);
    };
};

exports.getTransactions =  async(req, res, next) => {
    try{
        const {id} =  req.params
        console.log(id)

        const transaction = await sequelize.query(`
            SELECT 
                transactions.transaction_id,
                products.image,
                products.name,
                transactions.quantity
            FROM 
                transactions,products
            WHERE transactions.product_id = products.id and transactions.transaction_id = \"${id}\";
        `, {type: sequelize.QueryTypes.SELECT});
        res.json({
            transaction : transaction
        })
    }catch(err) {
      console.log(err);
    };
};
