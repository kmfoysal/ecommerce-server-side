const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/stripe');


const port = process.env.PORT || 5000 ;

// Middleware 
app.use(cors());
app.use(express.json());

// Mongodb connection 
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB Connected Successfully');
})
.catch((err)=>{
    console.log(err);
})


app.use('/', userRoute);
app.use('/', authRoute);
app.use('/', productRoute);
app.use('/', cartRoute);
app.use('/', orderRoute);
app.use('/', paymentRoute);

app.get('/', (req, res)=>{
    res.send('Welcom to shop');
})

app.listen(port, ()=>{
    console.log('Server is Running at Port', port);
})