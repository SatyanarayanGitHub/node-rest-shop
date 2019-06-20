const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling Get request  to /Orders resource"
    });
});

router.get('/:orderId', (req, res, next) => {

    const id = req.params.orderId;
    console.log('Order Id: ' + id);

    res.status(200).json({
        message: 'Order details',
        orderId: id
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Order was created"
    });
});

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    console.log('Order Id: ' + id);

    res.status(200).json({
        message: 'Order was updated',
        orderId: id
    });
});

router.delete('/:orderId', (req, res, next) => {

    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});


module.exports = router;