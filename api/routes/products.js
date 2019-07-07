const express = require('express');
const mongoose = require('mongoose');
const Product = require('../model/product');

const router = express.Router();

router.get('/', (req, res, next) => {

    Product.find()
        .select('name price _id')
        .exec()
        .then(docs => {
            console.log(docs);

            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };


            if (docs.length > 0) {
                res.status(200).json({
                    success: true,
                    data: response
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: response,
                    message: 'No Product exists'
                })
            }
        }
        ).catch(err => {
            console.log("==>> Error :: ", err);
            res.status(500).json({
                success: false,
                errorMessage: err
            })
        })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log('Product Id: ' + id);


    //if (true) {
    /*
    return res.status(404).json({
        success: false,
        message: "Product Id does not exist"
    });
    */
    //const error = new Error('Resource not found');
    //next(error);
    //}


    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(doc => {
            console.log("==>> Product :: ", doc);

            if (doc) {
                res.status(200).json({
                    success: true,
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'Get all Product',
                        url: 'http://localhost:3000/products'
                    }
                });
            } else {
                res.status(404).json({
                    success: true,
                    message: "No Product found for Product ID - " + id
                })
            }


        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                success: false,
                message: "Error in fetch Product. Check log for more information"
            });
        }

        );
});

router.post('/', (req, res, next) => {

    try {
        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            price: req.body.price
        });

        console.log("new Product " + product);


        // using promise apprach
        product.save()
            .then(result => {
                console.log(result);

                res.status(201).json({
                    success: true,
                    product: {
                        name: result.name,
                        price: result.price,
                        _id: result._id,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/products/" + result._id
                        }
                    }
                });
            })
            .catch(err => {
                console.log("==>> ERROR :: ", err);
                res.status(500).json({
                    success: false,
                    errorMessage: err
                });
            });

        /*
         product.save((err, result) => {
 
             if (err) {
                 console.log("==>> ERROR :: ", err);
                 return res.status(500).json({
                     success: false,
                     errorMessage: "Fail to add Product!!"
                 })
             }
 
             console.log('Product added successfully!!!');
             res.status(201).json({
                 success: true,
                 product: result
             });
         });
          */
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log('Product Id: ' + id);

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ups.value;
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log("Product updated   : ", result);
            res.status(200).json({
                success: true,
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:300/products/' + id
                }
            })
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                success: false,
                message: "Error in Update Product. Check log for more information"
            });

        });

    res.status(200).json({
        message: 'Update product for Product Id: ' + id
    });
});

router.delete('/:productId', (req, res, next) => {
    /*
    res.status(200).json({
        message: 'Product was deleted',
        productId: req.params.productId
    });
    */

    const id = req.params.productId;
    Product.deleteOne({
        _id: id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Product deleted successful!!',
                request: {
                    type: 'POST',
                    url: 'http://localhost:300/products',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                success: false,
                message: "Error in fetch Product. Check log for more information"
            });
        });
});


// dummy function for mocha test

router.get('/test/hello', (req, res, next) => {

    //console.debug('hello end point called...');

    res.status(200).json({
        success: true,
        data: 'hello'
    });
});

module.exports = router;