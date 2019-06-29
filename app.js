const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// Database connection 
//password=satya123
mongoose.connect("mongodb+srv://ronak:ronak123@cluster0-02wkr.mongodb.net/node-shop-db?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database');
    }).catch(() => {
        console.log('Connection failed!!!');
    });

mongoose.Promise = global.Promise;
//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Logger middleware
app.use(morgan('dev'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// CORS - Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Accept, Content-Type, Authorization');
    /*
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
            return res.status(200).json({});
        }
        */
    res.setHeader("Access-Contro-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
    next();
})

// Routes which should handle all incoming requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// No resource define
app.use((req, res, next) => {
    console.log('<<<<<< ***************************************** Resource not found ***************************************** >>>>>>')
    const error = new Error('Resource not found');

    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log('<<<<<< ============================ ERROR ============================ >>>>>>')

    res.status(error.status || 500);
    res.json({
        success: false,
        error: {
            message: error.message
        }
    });
});

module.exports = app;