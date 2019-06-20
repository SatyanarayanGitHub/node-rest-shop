const express = require('express');
const app = express();
const morgan = require('morgan');

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'));

// Routes which should handle all incoming requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;