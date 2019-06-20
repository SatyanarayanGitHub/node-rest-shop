const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

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

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        return res.status(200).json({});
    }
    //next();
})

// Routes which should handle all incoming requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// No resource define
app.use((req, res, next) => {
    const error = new Error('Resource not found');

    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {

    res.status(error.status || 500);
    res.json({
        success: false,
        error: {
            message: error.message
        }
    });
});

module.exports = app;