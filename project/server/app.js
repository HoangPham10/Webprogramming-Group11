require('dotenv').config();
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors')

const sequelize = require('./configs/database')





const app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(fileUpload({
  useTempFiles: true
}))



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
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });