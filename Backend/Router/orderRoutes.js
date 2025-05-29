const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');

// POST /api/orders - Create new order
router.post('/', orderController.createOrder);

// GET /api/orders - Get all orders (admin only)
router.get('/', orderController.getAllOrders);

// GET /api/orders/:id - Get specific order
router.get('/:id', orderController.getOrderById);

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', orderController.updateOrderStatus);

// DELETE /api/orders/:id - Cancel order
router.delete('/:id', orderController.cancelOrder);

// GET /api/orders/status/:status - Get orders by status
router.get('/status/:status', orderController.getOrdersByStatus);

// GET /api/orders/today - Get today's orders
router.get('/today', orderController.getTodaysOrders);

module.exports = router;
