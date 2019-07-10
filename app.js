const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const bookRoutes = require('./api/routes/book');

//we load the db location from the JSON files
const config = require('./config');

const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

app.listen(port, () => {
    console.log("App started on port :: ", port);
});


//db options
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

console.log("Environment :: ", environment);
console.log('db url: ', environmentConfig.database_url);

//db connection  
//mongoose.connect(environmentConfig.database_url, { useNewUrlParser: true });
//let db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));


// Database connection 
mongoose.connect(environmentConfig.database_url, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log('Database connection failed !!');
        console.error("Error Message :: ", err)
    });

mongoose.Promise = global.Promise;

// Logger middleware
//don't show the log when it is test
if (environment !== 'testing') {
    //'combined' outputs the Apache style LOGs
    //app.use(morgan('combined')); 
    app.use(morgan('dev'));
}


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//parse application/json and look for raw text                                        
/*
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));
*/

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
app.use('/books', bookRoutes);


// No resource define
app.use((req, res, next) => {
    console.log('<<<<<< ***************************************** Resource not found ***************************************** >>>>>>')
    const error = new Error('Resource not found');

    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    console.log('<<<<<< ====================================== ERROR ====================================== >>>>>>')

    res.status(error.status || 500);
    res.json({
        success: false,
        error: {
            message: error.message,
            error
        }
    });
});

module.exports = app;