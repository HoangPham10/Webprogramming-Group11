require('dotenv').config();
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk')
const cors = require('cors')

const sequelize = require('./configs/database')





const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
//app.use(cors({ origin: true, credentials: true }));
app.use(cors({ credentials: true, origin: "*" }));

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Max-Age", 600);


  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(fileUpload({
  useTempFiles: true
}))


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AfDcAhubUwCMq57Ws-XQincIzTgSgGgDBKtbwwbME4UaiPaBBt9-u-20wSVpv34uZHqgCJWUOKA0dPgz',
  'client_secret': 'ED-LwnSs5iYBWbYNBa4gIbWqnmI0Rr1iMXN-g_cVSL1M_eyPMv8yv5YHWDYC-cDoNmSoF1EWkMJKkXPh'
});




// Import Routes
app.use('/product',require('./routes/product'));
app.use('/user',require('./routes/user'));
app.use('/category',require('./routes/category'));
app.use('/cart',require('./routes/cart'));
app.use('/shipment',require('./routes/shipments'));
app.use('/payment',require('./routes/payment'));
app.use('/transaction',require('./routes/transaction'));
app.use('/review',require('./routes/reviews'));
app.use('/api', require('./routes/upload'))





sequelize
  //.sync({ force: true })
  .sync()
  .then(resizeBy => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });