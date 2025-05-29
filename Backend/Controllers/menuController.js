const Joi = require('joi');

// In-memory menu data (in a real app, this would be in a database)
let menuItems = [
  {
    id: 1,
    name: "Classic Espresso",
    category: "Hot Coffee",
    price: 3.99,
    description: "Rich and bold classic espresso shot with perfect crema",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Whole Milk", "Almond Milk", "Oat Milk", "Soy Milk"],
    prepTime: "2-3 mins",
    calories: { Small: 5, Medium: 10, Large: 15 },
    allergens: ["None"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Hot Coffee",
    price: 4.49,
    description: "Perfect balance of espresso, steamed milk, and foam",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Whole Milk", "Almond Milk", "Oat Milk", "Soy Milk"],
    prepTime: "3-4 mins",
    calories: { Small: 80, Medium: 120, Large: 160 },
    allergens: ["Dairy"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Latte",
    category: "Hot Coffee",
    price: 4.99,
    description: "Smooth espresso with steamed milk and light foam",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Whole Milk", "Almond Milk", "Oat Milk", "Soy Milk", "Vanilla", "Caramel", "Hazelnut"],
    prepTime: "3-4 mins",
    calories: { Small: 120, Medium: 180, Large: 240 },
    allergens: ["Dairy"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Americano",
    category: "Hot Coffee",
    price: 3.49,
    description: "Espresso shots with hot water for a clean, bold taste",
    image: "https://images.unsplash.com/photo-1497636577773-f1231844b336",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Regular", "Extra Shot"],
    prepTime: "2-3 mins",
    calories: { Small: 10, Medium: 15, Large: 20 },
    allergens: ["None"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Iced Cold Brew",
    category: "Cold Coffee",
    price: 4.99,
    description: "Smooth and refreshing cold brew coffee, steeped for 12 hours",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Classic", "Vanilla", "Caramel", "Mocha"],
    prepTime: "1-2 mins",
    calories: { Small: 5, Medium: 10, Large: 15 },
    allergens: ["None"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: "Iced Latte",
    category: "Cold Coffee",
    price: 5.49,
    description: "Chilled espresso with cold milk over ice",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Whole Milk", "Almond Milk", "Oat Milk", "Soy Milk", "Vanilla", "Caramel"],
    prepTime: "2-3 mins",
    calories: { Small: 110, Medium: 170, Large: 230 },
    allergens: ["Dairy"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    name: "Frappuccino",
    category: "Cold Coffee",
    price: 6.49,
    description: "Blended coffee drink with ice and whipped cream",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371",
    sizes: ["Medium", "Large"],
    customizations: ["Vanilla", "Caramel", "Mocha", "Strawberry"],
    prepTime: "3-4 mins",
    calories: { Medium: 250, Large: 350 },
    allergens: ["Dairy"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 8,
    name: "Chai Latte",
    category: "Specialty",
    price: 4.99,
    description: "Spiced tea blend with steamed milk and aromatic spices",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Whole Milk", "Almond Milk", "Oat Milk", "Soy Milk", "Extra Spicy"],
    prepTime: "3-4 mins",
    calories: { Small: 120, Medium: 180, Large: 240 },
    allergens: ["Dairy"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 9,
    name: "Hot Chocolate",
    category: "Specialty",
    price: 4.49,
    description: "Rich and creamy hot chocolate with whipped cream",
    image: "https://images.unsplash.com/photo-1542990253-0b8be4b5be8c",
    sizes: ["Small", "Medium", "Large"],
    customizations: ["Whole Milk", "Almond Milk", "Oat Milk", "Marshmallows", "Whipped Cream"],
    prepTime: "3-4 mins",
    calories: { Small: 200, Medium: 300, Large: 400 },
    allergens: ["Dairy"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 10,
    name: "Croissant",
    category: "Pastries",
    price: 3.99,
    description: "Buttery, flaky French pastry baked fresh daily",
    image: "https://images.unsplash.com/photo-1555507036-ab794f4ade0a",
    sizes: ["Regular"],
    customizations: ["Plain", "Almond", "Chocolate"],
    prepTime: "Ready",
    calories: { Regular: 280 },
    allergens: ["Gluten", "Dairy", "Eggs"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 11,
    name: "Blueberry Muffin",
    category: "Pastries",
    price: 3.49,
    description: "Fresh blueberry muffin with a golden top",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa",
    sizes: ["Regular"],
    customizations: ["Regular", "Sugar-Free"],
    prepTime: "Ready",
    calories: { Regular: 320 },
    allergens: ["Gluten", "Dairy", "Eggs"],
    available: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 12,
    name: "Avocado Toast",
    category: "Food",
    price: 7.99,
    description: "Fresh avocado on artisan bread with sea salt and lime",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d",
    sizes: ["Regular"],
    customizations: ["Regular", "Extra Avocado", "Add Egg", "Add Tomato"],
    prepTime: "5-7 mins",
    calories: { Regular: 350 },
    allergens: ["Gluten"],
    available: true,
    createdAt: new Date().toISOString()
  }
];

// Validation schemas
const menuItemSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  category: Joi.string().required().valid('Hot Coffee', 'Cold Coffee', 'Specialty', 'Pastries', 'Food'),
  price: Joi.number().required().min(0).max(1000),
  description: Joi.string().required().min(10).max(500),
  image: Joi.string().uri().required(),
  sizes: Joi.array().items(Joi.string()).min(1).required(),
  customizations: Joi.array().items(Joi.string()).min(1).required(),
  prepTime: Joi.string().required(),
  calories: Joi.object().required(),
  allergens: Joi.array().items(Joi.string()).required(),
  available: Joi.boolean().default(true)
});

// Get all menu items
const getAllMenuItems = async (req, res, next) => {
  try {
    const { category, available } = req.query;
    
    let filteredItems = menuItems;
    
    // Filter by category if provided
    if (category) {
      filteredItems = filteredItems.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by availability if provided
    if (available !== undefined) {
      filteredItems = filteredItems.filter(item => 
        item.available === (available === 'true')
      );
    }
    
    res.status(200).json({
      success: true,
      count: filteredItems.length,
      data: filteredItems
    });
  } catch (error) {
    next(error);
  }
};

// Get menu item by ID
const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menuItem = menuItems.find(item => item.id === parseInt(id));
    
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};

// Get menu items by category
const getMenuItemsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const filteredItems = menuItems.filter(item => 
      item.category.toLowerCase() === category.toLowerCase() && item.available
    );
    
    res.status(200).json({
      success: true,
      count: filteredItems.length,
      data: filteredItems
    });
  } catch (error) {
    next(error);
  }
};

// Add new menu item
const addMenuItem = async (req, res, next) => {
  try {
    const { error, value } = menuItemSchema.validate(req.body);
    
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
    
    const newMenuItem = {
      id: Math.max(...menuItems.map(item => item.id)) + 1,
      ...value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    menuItems.push(newMenuItem);
    
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: newMenuItem
    });
  } catch (error) {
    next(error);
  }
};

// Update menu item
const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menuItemIndex = menuItems.findIndex(item => item.id === parseInt(id));
    
    if (menuItemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    const { error, value } = menuItemSchema.validate(req.body);
    
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
    
    menuItems[menuItemIndex] = {
      ...menuItems[menuItemIndex],
      ...value,
      updatedAt: new Date().toISOString()
    };
    
    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItems[menuItemIndex]
    });
  } catch (error) {
    next(error);
  }
};

// Delete menu item
const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menuItemIndex = menuItems.findIndex(item => item.id === parseInt(id));
    
    if (menuItemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found'
      });
    }
    
    const deletedItem = menuItems.splice(menuItemIndex, 1)[0];
    
    res.status(200).json({
      success: true,
      message: 'Menu item deleted successfully',
      data: deletedItem
    });
  } catch (error) {
    next(error);
  }
};

// Search menu items
const searchMenuItems = async (req, res, next) => {
  try {
    const { query } = req.params;
    const searchTerm = query.toLowerCase();
    
    const filteredItems = menuItems.filter(item => 
      item.available && (
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      )
    );
    
    res.status(200).json({
      success: true,
      count: filteredItems.length,
      data: filteredItems
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  getMenuItemsByCategory,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  searchMenuItems
};
