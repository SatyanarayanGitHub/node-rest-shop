const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Orders were fetched"
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log('Product Id: ' + id);
  
    if(true){
        return res.status(404).json({
            success: false,
            message: "Product Id does not exist"
        });
    }

    res.status(200).json({
        message: 'Get product for Product Id: ' + id
    });
});

router.post('/', (req, res, next) => {

    res.status(201).json({
        message: "Handling Post request  to /Products resource"
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log('Product Id: ' + id);

    res.status(200).json({
        message: 'Update product for Product Id: ' + id
    });
});

router.delete('/productId', (req, res, next) => {

    res.status(200).json({
        message: 'Product was deleted',
        productId: req.params.productId
    });
});

module.exports = router;