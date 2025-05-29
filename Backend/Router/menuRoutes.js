const express = require('express');
const router = express.Router();
const menuController = require('../Controllers/menuController');

// GET /api/menu - Get all menu items
router.get('/', menuController.getAllMenuItems);

// GET /api/menu/:id - Get specific menu item
router.get('/:id', menuController.getMenuItemById);

// GET /api/menu/category/:category - Get menu items by category
router.get('/category/:category', menuController.getMenuItemsByCategory);

// POST /api/menu - Add new menu item (admin only)
router.post('/', menuController.addMenuItem);

// PUT /api/menu/:id - Update menu item (admin only)
router.put('/:id', menuController.updateMenuItem);

// DELETE /api/menu/:id - Delete menu item (admin only)
router.delete('/:id', menuController.deleteMenuItem);

// GET /api/menu/search/:query - Search menu items
router.get('/search/:query', menuController.searchMenuItems);

module.exports = router;
