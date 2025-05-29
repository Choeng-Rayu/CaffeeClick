const { ORDER_STATUSES } = require('./orderController');

// Mock data for analytics (in a real app, this would query the database)
let orders = []; // This would be imported from a shared data store

// Helper function to get orders (in a real app, this would be a database query)
const getOrders = () => {
  // Import orders from orderController or database
  return require('./orderController').orders || [];
};

// Get sales analytics
const getSalesAnalytics = async (req, res, next) => {
  try {
    const { period = '7d', startDate, endDate } = req.query;
    const orders = getOrders();
    
    let filteredOrders = orders.filter(order => 
      order.status === ORDER_STATUSES.COMPLETED
    );
    
    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    } else {
      // Default period filtering
      const now = new Date();
      const periodDays = {
        '1d': 1,
        '7d': 7,
        '30d': 30,
        '90d': 90
      };
      
      const days = periodDays[period] || 7;
      const startPeriod = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      
      filteredOrders = filteredOrders.filter(order => 
        new Date(order.createdAt) >= startPeriod
      );
    }
    
    // Calculate analytics
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = filteredOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    // Group by date
    const salesByDate = filteredOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toDateString();
      if (!acc[date]) {
        acc[date] = { orders: 0, revenue: 0 };
      }
      acc[date].orders += 1;
      acc[date].revenue += order.total;
      return acc;
    }, {});
    
    // Convert to array format
    const dailySales = Object.entries(salesByDate).map(([date, data]) => ({
      date,
      orders: data.orders,
      revenue: data.revenue
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          totalOrders,
          averageOrderValue: Math.round(averageOrderValue * 100) / 100,
          period
        },
        dailySales
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get popular items
const getPopularItems = async (req, res, next) => {
  try {
    const { limit = 10, period = '30d' } = req.query;
    const orders = getOrders();
    
    // Filter completed orders within period
    const now = new Date();
    const periodDays = { '7d': 7, '30d': 30, '90d': 90 };
    const days = periodDays[period] || 30;
    const startPeriod = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const recentOrders = orders.filter(order => 
      order.status === ORDER_STATUSES.COMPLETED &&
      new Date(order.createdAt) >= startPeriod
    );
    
    // Count item popularity
    const itemStats = {};
    
    recentOrders.forEach(order => {
      order.items.forEach(item => {
        const key = `${item.name}-${item.size}`;
        if (!itemStats[key]) {
          itemStats[key] = {
            name: item.name,
            size: item.size,
            category: item.category || 'Unknown',
            totalQuantity: 0,
            totalRevenue: 0,
            orderCount: 0
          };
        }
        itemStats[key].totalQuantity += item.quantity;
        itemStats[key].totalRevenue += item.finalPrice * item.quantity;
        itemStats[key].orderCount += 1;
      });
    });
    
    // Convert to array and sort by popularity
    const popularItems = Object.values(itemStats)
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, parseInt(limit))
      .map((item, index) => ({
        rank: index + 1,
        ...item,
        averagePrice: Math.round((item.totalRevenue / item.totalQuantity) * 100) / 100
      }));
    
    res.status(200).json({
      success: true,
      data: {
        period,
        items: popularItems
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get revenue analytics
const getRevenueAnalytics = async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;
    const orders = getOrders();
    
    const now = new Date();
    const periodDays = { '7d': 7, '30d': 30, '90d': 90 };
    const days = periodDays[period] || 30;
    const startPeriod = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const completedOrders = orders.filter(order => 
      order.status === ORDER_STATUSES.COMPLETED &&
      new Date(order.createdAt) >= startPeriod
    );
    
    // Revenue by category
    const revenueByCategory = {};
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        const category = item.category || 'Unknown';
        if (!revenueByCategory[category]) {
          revenueByCategory[category] = 0;
        }
        revenueByCategory[category] += item.finalPrice * item.quantity;
      });
    });
    
    // Revenue by hour
    const revenueByHour = Array(24).fill(0);
    completedOrders.forEach(order => {
      const hour = new Date(order.createdAt).getHours();
      revenueByHour[hour] += order.total;
    });
    
    // Revenue by day of week
    const revenueByDayOfWeek = Array(7).fill(0);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    completedOrders.forEach(order => {
      const dayOfWeek = new Date(order.createdAt).getDay();
      revenueByDayOfWeek[dayOfWeek] += order.total;
    });
    
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
    
    res.status(200).json({
      success: true,
      data: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        period,
        byCategory: Object.entries(revenueByCategory).map(([category, revenue]) => ({
          category,
          revenue: Math.round(revenue * 100) / 100,
          percentage: Math.round((revenue / totalRevenue) * 100 * 100) / 100
        })),
        byHour: revenueByHour.map((revenue, hour) => ({
          hour,
          revenue: Math.round(revenue * 100) / 100
        })),
        byDayOfWeek: revenueByDayOfWeek.map((revenue, day) => ({
          day: dayNames[day],
          revenue: Math.round(revenue * 100) / 100
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get orders by time
const getOrdersByTime = async (req, res, next) => {
  try {
    const { period = '7d' } = req.query;
    const orders = getOrders();
    
    const now = new Date();
    const periodDays = { '7d': 7, '30d': 30, '90d': 90 };
    const days = periodDays[period] || 7;
    const startPeriod = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const filteredOrders = orders.filter(order => 
      new Date(order.createdAt) >= startPeriod
    );
    
    // Orders by hour
    const ordersByHour = Array(24).fill(0);
    filteredOrders.forEach(order => {
      const hour = new Date(order.createdAt).getHours();
      ordersByHour[hour] += 1;
    });
    
    // Peak hours analysis
    const hourlyData = ordersByHour.map((count, hour) => ({ hour, count }));
    const peakHour = hourlyData.reduce((max, current) => 
      current.count > max.count ? current : max
    );
    
    res.status(200).json({
      success: true,
      data: {
        period,
        ordersByHour: hourlyData,
        peakHour,
        totalOrders: filteredOrders.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get daily summary
const getDailySummary = async (req, res, next) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    const dateString = targetDate.toDateString();
    
    const orders = getOrders();
    const dailyOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === dateString
    );
    
    const completedOrders = dailyOrders.filter(order => 
      order.status === ORDER_STATUSES.COMPLETED
    );
    
    const pendingOrders = dailyOrders.filter(order => 
      [ORDER_STATUSES.PENDING, ORDER_STATUSES.CONFIRMED, ORDER_STATUSES.PREPARING].includes(order.status)
    );
    
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;
    
    // Most popular item today
    const itemCounts = {};
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        const key = item.name;
        itemCounts[key] = (itemCounts[key] || 0) + item.quantity;
      });
    });
    
    const mostPopularItem = Object.entries(itemCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    res.status(200).json({
      success: true,
      data: {
        date: dateString,
        summary: {
          totalOrders: dailyOrders.length,
          completedOrders: completedOrders.length,
          pendingOrders: pendingOrders.length,
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          averageOrderValue: Math.round(averageOrderValue * 100) / 100
        },
        mostPopularItem: mostPopularItem ? {
          name: mostPopularItem[0],
          quantity: mostPopularItem[1]
        } : null,
        ordersByStatus: {
          [ORDER_STATUSES.PENDING]: dailyOrders.filter(o => o.status === ORDER_STATUSES.PENDING).length,
          [ORDER_STATUSES.CONFIRMED]: dailyOrders.filter(o => o.status === ORDER_STATUSES.CONFIRMED).length,
          [ORDER_STATUSES.PREPARING]: dailyOrders.filter(o => o.status === ORDER_STATUSES.PREPARING).length,
          [ORDER_STATUSES.READY]: dailyOrders.filter(o => o.status === ORDER_STATUSES.READY).length,
          [ORDER_STATUSES.COMPLETED]: dailyOrders.filter(o => o.status === ORDER_STATUSES.COMPLETED).length,
          [ORDER_STATUSES.CANCELLED]: dailyOrders.filter(o => o.status === ORDER_STATUSES.CANCELLED).length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSalesAnalytics,
  getPopularItems,
  getRevenueAnalytics,
  getOrdersByTime,
  getDailySummary
};
