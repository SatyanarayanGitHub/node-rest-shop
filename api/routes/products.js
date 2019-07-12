const express = require('express');
const router = express.Router();

const productRepository = require('../repository/productRepository');

router.get('/', productRepository.getAllProducts);

router.get('/:productId', productRepository.getProductById);

router.post('/', productRepository.saveProduct);

router.patch('/:productId', productRepository.updateProduct);

router.delete('/:productId', productRepository.deleteProduct);

module.exports = router;