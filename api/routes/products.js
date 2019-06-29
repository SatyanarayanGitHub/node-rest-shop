const express = require('express');
const mongoose = require('mongoose');
const Product = require('../model/product');

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);

            if (docs.length > 0) {
                res.status(200).json({
                    success: true,
                    data: docs
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: docs,
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
        .exec()
        .then(doc => {
            console.log("==>> Product :: ", doc);

            if (doc) {
                res.status(200).json(doc);
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

        /*
        // using promise apprach
        product.save()
            .then(result => {
                console.log(result);

                res.status(201).json({
                    message: "Handling Post request  to /Products resource",
                    product: product
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    success: false,
                    errorMessage: err
            });
        */
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
            console.log(result);
            res.status(200).json({
                success: true,
                data: result
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
                message: 'Product deleted successful!!'
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

module.exports = router;