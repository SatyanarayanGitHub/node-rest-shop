const express = require('express');
const orderRepository = require('../repository/orderRepository');

const router = express.Router();
// Get ALL orders
router.get('/', orderRepository.getAllOrders);

// GET order by Id
router.get('/:orderId', orderRepository.getOrderById);

// Create an Order
router.post('/', orderRepository.saveOrder);

// Update an Order
router.patch('/:orderId', orderRepository.updateOrder);

// Delete an Order
router.delete('/:orderId', orderRepository.deleteOrder);

// Get ALL orders with product data
router.get('/orderwithproduct/all', orderRepository.getAllOrderWithProductDetail);

// GET order by Id with product data
router.get('/orderwithproduct/:orderId', orderRepository.getOrderWithProductDetailByOrderId);


module.exports = router;