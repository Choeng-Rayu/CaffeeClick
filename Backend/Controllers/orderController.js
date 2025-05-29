const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// In-memory orders storage (in a real app, this would be in a database)
let orders = [];

// Order statuses
const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Validation schemas
const orderItemSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  size: Joi.string().required(),
  customization: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  finalPrice: Joi.number().required()
});

const orderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required(),
  subtotal: Joi.number().required().min(0),
  tax: Joi.number().required().min(0),
  total: Joi.number().required().min(0),
  orderNotes: Joi.string().allow('').max(500),
  customerInfo: Joi.object({
    name: Joi.string().max(100),
    phone: Joi.string().max(20),
    email: Joi.string().email().max(100)
  }).optional(),
  estimatedTime: Joi.string().default('15-20 minutes')
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid(...Object.values(ORDER_STATUSES)).required(),
  notes: Joi.string().allow('').max(500)
});

// Helper function to calculate estimated completion time
const calculateEstimatedTime = (items) => {
  const totalPrepTime = items.reduce((total, item) => {
    // Simple logic: 2 minutes per item + complexity factor
    const baseTime = 2;
    const complexityFactor = item.customization !== 'Regular' ? 1 : 0;
    return total + (baseTime + complexityFactor) * item.quantity;
  }, 0);
  
  // Add base preparation time
  const estimatedMinutes = Math.max(10, totalPrepTime + 5);
  return `${estimatedMinutes}-${estimatedMinutes + 5} minutes`;
};

// Create new order
const createOrder = async (req, res, next) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }
    
    const orderNumber = Math.floor(Math.random() * 10000) + 1000;
    const estimatedTime = calculateEstimatedTime(value.items);
    const estimatedCompletion = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
    
    const newOrder = {
      id: uuidv4(),
      orderNumber,
      ...value,
      status: ORDER_STATUSES.PENDING,
      estimatedTime,
      estimatedCompletion,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      statusHistory: [{
        status: ORDER_STATUSES.PENDING,
        timestamp: new Date().toISOString(),
        notes: 'Order received'
      }]
    };
    
    orders.push(newOrder);
    
    // Auto-confirm order after 1 second (simulate processing)
    setTimeout(() => {
      const orderIndex = orders.findIndex(order => order.id === newOrder.id);
      if (orderIndex !== -1 && orders[orderIndex].status === ORDER_STATUSES.PENDING) {
        orders[orderIndex].status = ORDER_STATUSES.CONFIRMED;
        orders[orderIndex].updatedAt = new Date().toISOString();
        orders[orderIndex].statusHistory.push({
          status: ORDER_STATUSES.CONFIRMED,
          timestamp: new Date().toISOString(),
          notes: 'Order confirmed and sent to kitchen'
        });
      }
    }, 1000);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        id: newOrder.id,
        orderNumber: newOrder.orderNumber,
        status: newOrder.status,
        estimatedTime: newOrder.estimatedTime,
        estimatedCompletion: newOrder.estimatedCompletion,
        total: newOrder.total
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const { status, date, limit = 50, offset = 0 } = req.query;
    
    let filteredOrders = [...orders];
    
    // Filter by status
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }
    
    // Filter by date
    if (date) {
      const targetDate = new Date(date).toDateString();
      filteredOrders = filteredOrders.filter(order => 
        new Date(order.createdAt).toDateString() === targetDate
      );
    }
    
    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Pagination
    const paginatedOrders = filteredOrders.slice(offset, offset + parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: paginatedOrders.length,
      total: filteredOrders.length,
      data: paginatedOrders
    });
  } catch (error) {
    next(error);
  }
};

// Get order by ID
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = orders.find(order => order.id === id || order.orderNumber === parseInt(id));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = statusUpdateSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
    }
    
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    const order = orders[orderIndex];
    
    // Validate status transition
    const validTransitions = {
      [ORDER_STATUSES.PENDING]: [ORDER_STATUSES.CONFIRMED, ORDER_STATUSES.CANCELLED],
      [ORDER_STATUSES.CONFIRMED]: [ORDER_STATUSES.PREPARING, ORDER_STATUSES.CANCELLED],
      [ORDER_STATUSES.PREPARING]: [ORDER_STATUSES.READY, ORDER_STATUSES.CANCELLED],
      [ORDER_STATUSES.READY]: [ORDER_STATUSES.COMPLETED],
      [ORDER_STATUSES.COMPLETED]: [],
      [ORDER_STATUSES.CANCELLED]: []
    };
    
    if (!validTransitions[order.status].includes(value.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot transition from ${order.status} to ${value.status}`
      });
    }
    
    // Update order
    orders[orderIndex] = {
      ...order,
      status: value.status,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...order.statusHistory,
        {
          status: value.status,
          timestamp: new Date().toISOString(),
          notes: value.notes || `Order status updated to ${value.status}`
        }
      ]
    };
    
    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: orders[orderIndex]
    });
  } catch (error) {
    next(error);
  }
};

// Cancel order
const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    const order = orders[orderIndex];
    
    // Check if order can be cancelled
    if ([ORDER_STATUSES.COMPLETED, ORDER_STATUSES.CANCELLED].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: 'Cannot cancel completed or already cancelled order'
      });
    }
    
    // Update order status to cancelled
    orders[orderIndex] = {
      ...order,
      status: ORDER_STATUSES.CANCELLED,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        ...order.statusHistory,
        {
          status: ORDER_STATUSES.CANCELLED,
          timestamp: new Date().toISOString(),
          notes: 'Order cancelled by customer'
        }
      ]
    };
    
    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: orders[orderIndex]
    });
  } catch (error) {
    next(error);
  }
};

// Get orders by status
const getOrdersByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;
    
    if (!Object.values(ORDER_STATUSES).includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid order status'
      });
    }
    
    const filteredOrders = orders.filter(order => order.status === status);
    
    res.status(200).json({
      success: true,
      count: filteredOrders.length,
      data: filteredOrders
    });
  } catch (error) {
    next(error);
  }
};

// Get today's orders
const getTodaysOrders = async (req, res, next) => {
  try {
    const today = new Date().toDateString();
    const todaysOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today
    );
    
    // Group by status
    const ordersByStatus = todaysOrders.reduce((acc, order) => {
      if (!acc[order.status]) {
        acc[order.status] = [];
      }
      acc[order.status].push(order);
      return acc;
    }, {});
    
    // Calculate summary
    const summary = {
      total: todaysOrders.length,
      revenue: todaysOrders
        .filter(order => order.status === ORDER_STATUSES.COMPLETED)
        .reduce((sum, order) => sum + order.total, 0),
      byStatus: Object.keys(ordersByStatus).reduce((acc, status) => {
        acc[status] = ordersByStatus[status].length;
        return acc;
      }, {})
    };
    
    res.status(200).json({
      success: true,
      summary,
      data: ordersByStatus
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrdersByStatus,
  getTodaysOrders,
  ORDER_STATUSES
};
