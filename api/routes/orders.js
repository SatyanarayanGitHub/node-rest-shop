const express = require('express');
const mongoose = require('mongoose');
const Order = require('../model/order');
const Product = require('../model/product')

const router = express.Router();
// Get ALL orders
router.get('/', (req, res, next) => {

    Order.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                success: true,
                data: docs.map(doc => {
                    return {
                        productId: doc.product,
                        quantity: doc.quantity,
                        id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            }).end();
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                success: false,
                errorMessage: err
            });
        });

});

// GET order by Id
router.get('/:orderId', async (req, res, next) => {

    try {
        const id = req.params.orderId;
        console.log('Order Id: ' + id);

        const order = await Order.findById(id).select('product quantity _id');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order does not found'
            }).end();
        }

        res.status(200).json(order).end();

    } catch (e) {
        console.log("==>> ERROR :: ", e);
        res.status(500).json({
            success: false,
            error: e
        })
    }
});

// Create an Order
router.post('/', async (req, res, next) => {

    const product = await Product.findById(req.body.productId);

    if (!product) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Product does not exist for Id - ' + req.body.productId
        }).end();
    }

    const order = new Order({
        _id: new mongoose.Types.ObjectId,
        quantity: req.body.quantity,
        product: req.body.productId
    });

    order.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                success: true,
                data: result
            }).end();
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                status: false,
                errorMessage: err
            })
        });
});

// Update an Order
router.patch('/:orderId', async (req, res, next) => {
    const id = req.params.orderId;
    console.log('Order Id: ' + id);

    const order = await Order.findById(id).select('product quantity _id');

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        }).end();
    }

    Order.update({ _id: id }, { $set: { quantity: req.body.quantity } })
        .exec()
        .then(result => {
            console.log("Product updated   : ", result);
            res.status(200).json({
                success: true,
                message: 'Product updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + id
                }
            })
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                success: false,
                message: "Error in Update Product. Check log for more information"
            });
        }).end();

});

// Delete an Order
router.delete('/:orderId', async (req, res, next) => {
    const id = req.params.orderId;
    console.log('Order Id: ' + id);

    const order = await Order.findById(id).select('product quantity _id');

    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'Order not found'
        }).end();
    }

    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: {
                        productId: "ID",
                        quantity: "Number"
                    }
                }
            })
        })
        .catch(err => {
            console.log("==>> ERROR :: ", err);
            res.status(500).json({
                status: false,
                errorMessage: err
            })
        });

});


module.exports = router;