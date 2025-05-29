const express = require('express');
const router = express.Router();
const analyticsController = require('../Controllers/analyticsController');

// GET /api/analytics/sales - Get sales analytics
router.get('/sales', analyticsController.getSalesAnalytics);

// GET /api/analytics/popular-items - Get most popular items
router.get('/popular-items', analyticsController.getPopularItems);

// GET /api/analytics/revenue - Get revenue analytics
router.get('/revenue', analyticsController.getRevenueAnalytics);

// GET /api/analytics/orders-by-time - Get orders by time of day
router.get('/orders-by-time', analyticsController.getOrdersByTime);

// GET /api/analytics/daily-summary - Get daily summary
router.get('/daily-summary', analyticsController.getDailySummary);

module.exports = router;
