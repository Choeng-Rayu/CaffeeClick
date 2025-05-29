# CoffeeClick Backend API

A robust Node.js/Express backend API for the CoffeeClick coffee ordering system.

## 🚀 Features

- **Menu Management**: CRUD operations for coffee menu items
- **Order Processing**: Complete order lifecycle management
- **Analytics**: Sales, revenue, and performance analytics
- **Real-time Status Updates**: Order status tracking
- **Input Validation**: Comprehensive request validation with Joi
- **Error Handling**: Centralized error handling middleware
- **Security**: Helmet.js security headers and CORS configuration
- **Logging**: Request logging and error tracking

## 📋 API Endpoints

### Menu Endpoints
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get specific menu item
- `GET /api/menu/category/:category` - Get items by category
- `POST /api/menu` - Add new menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item
- `GET /api/menu/search/:query` - Search menu items

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get specific order
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Cancel order
- `GET /api/orders/status/:status` - Get orders by status
- `GET /api/orders/today` - Get today's orders

### Analytics Endpoints
- `GET /api/analytics/sales` - Sales analytics
- `GET /api/analytics/popular-items` - Most popular items
- `GET /api/analytics/revenue` - Revenue analytics
- `GET /api/analytics/orders-by-time` - Orders by time analysis
- `GET /api/analytics/daily-summary` - Daily summary

### System Endpoints
- `GET /health` - Health check
- `GET /` - API information

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📁 Project Structure

```
Backend/
├── Controllers/           # Route controllers
│   ├── menuController.js
│   ├── orderController.js
│   └── analyticsController.js
├── MiddleWare/           # Custom middleware
│   ├── errorHandler.js
│   └── requestLogger.js
├── Router/               # Route definitions
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   └── analyticsRoutes.js
├── .env                  # Environment variables
├── server.js            # Main server file
└── package.json         # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |

## 📊 Order Status Flow

```
PENDING → CONFIRMED → PREPARING → READY → COMPLETED
    ↓         ↓          ↓
CANCELLED  CANCELLED  CANCELLED
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Joi schema validation
- **Error Handling**: Secure error responses
- **Rate Limiting**: Request rate limiting (configurable)

## 📈 Analytics Features

- Sales analytics with date filtering
- Popular items tracking
- Revenue breakdown by category/time
- Order patterns analysis
- Daily/weekly/monthly summaries

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 🚀 Deployment

1. **Set production environment:**
   ```bash
   NODE_ENV=production
   ```

2. **Install production dependencies:**
   ```bash
   npm ci --only=production
   ```

3. **Start with PM2 (recommended):**
   ```bash
   pm2 start server.js --name "coffeeclick-api"
   ```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": [...] // Optional validation details
}
```

## 🔄 Order Lifecycle

1. **Order Creation**: Customer submits order
2. **Auto-Confirmation**: Order automatically confirmed
3. **Kitchen Processing**: Staff updates to "preparing"
4. **Ready for Pickup**: Order marked as "ready"
5. **Completion**: Order marked as "completed"

## 🎯 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- User authentication and authorization
- Payment processing integration
- Real-time notifications (WebSocket)
- Email notifications
- Advanced analytics and reporting
- Inventory management
- Multi-location support

## 📞 Support

For support and questions, please contact the development team.

## 📄 License

MIT License - see LICENSE file for details.
