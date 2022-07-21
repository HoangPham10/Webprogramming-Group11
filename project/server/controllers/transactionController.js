const Transaction = require('../models/transaction');
const Cart = require('../models/cart')
const { Op } = require("sequelize");
const sequelize = require('../configs/database');
const paypal = require('paypal-rest-sdk')
const User = require('../models/user')

exports.PaymentMethod = async(req,res,next) => {
    try{
        const {transaction_id,username,cart,payment_id,shipment_id} =  req.body
        const user = await User.findOne({
                where:{
                    username: username
                }
            })
        const totalPrice = cart.reduce((total, num) => total + num.price * num.quantity, 0)

        if (payment_id  == 2){ // Thanh toan qua paypal
            const payload = {
                intent: 'sale',
                payer: {
                payment_method: 'paypal'
                },
                transactions: [{
                amount: {
                    currency: "USD",
                    total: totalPrice+shipment_id*5,
                    details: {
                    shipping: shipment_id*5,
                    subtotal: totalPrice,
                    shipping_discount: 0,
                    insurance: 0,
                    handling_fee: 0,
                    tax: 0
                    }
                },
                description: "This is the payment transaction description",
                payment_options: {
                    allowed_payment_method: "IMMEDIATE_PAY"
                },
                item_list: {
                    shipping_address: {
                    recipient_name: 'PP Plus Recipient',
                    line1: "Gregório Rolim de Oliveira, 42",
                    line2: "JD Serrano II",
                    city: "Votorantim",
                    country_code: "US",
                    postal_code: "18117-134",
                    state: "São Paulo",
                    phone: user.phone
                    },
                    items: [
                        ...cart.map((item) => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            description: item.name,
                            tax: 0,
                            sku: item.name,
                            currency: "USD"
                        }))
                    ]
                }
                }],
                redirect_urls: {
                return_url: "http://localhost:3000/orders/thankyou",
                cancel_url: "http://localhost:3000/orders/error"
                }
            }

            
            paypal.payment.create(JSON.stringify(payload), function (error, payment) {
                if (error) {
                    return [];
                    throw error;
                } else {
                    console.log(payment)
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            // res.writeHead(301, {
                            //     Location: `${payment.links[i].href}/`
                            //   }).end();
                            res.json({redirect_url:payment.links[i].href})
                        }
                    }
                }
            });

        }
    }catch(err){
        console.log(err)
    }
}

exports.transactionSuccess = async(req, res, next) => {
    try{
        const {transaction_id,username,cart,payment_id,shipment_id} =  req.body.payload;
        const { PayerID,paymentId } = req.body
        const totalPrice = cart.reduce((total, num) => total + num.price * num.quantity, 0) + shipment_id * 5

        const execute_payment = {
            payer_id: PayerID,
            transactions: [{
                amount: {
                    currency: "USD",
                    total: totalPrice
                }
            }]
        };

        paypal.payment.execute(paymentId, JSON.stringify(execute_payment), function(error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                res.send('Success (Mua hàng thành công)');
            }
        });

       
    }catch(err) {
      console.log(err);
    };
};



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
