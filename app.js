const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const orderRoutes=require('./api/routes/orders');
const productRoutes = require('./api/routes/products');

mongoose.connect('mongodb://localhost:27017/mydb',{useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('connected',()=>{
    console.log('connection to mongodb established');
})
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-origin","*");
    res.header("Access-Control-Allow-Header",
    "Origin, X-Request-With, Content-Type,Accept,Authorization"
    );
    if (req,method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error)       
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;