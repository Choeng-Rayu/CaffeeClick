// Menu data for CoffeeClick
export const coffeeData = [
  // Hot Coffee
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
    allergens: ["None"]
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
    allergens: ["Dairy"]
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
    allergens: ["Dairy"]
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
    allergens: ["None"]
  },
  // Cold Coffee
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
    allergens: ["None"]
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
    allergens: ["Dairy"]
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
    allergens: ["Dairy"]
  },
  // Specialty Drinks
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
    allergens: ["Dairy"]
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
    allergens: ["Dairy"]
  },
  // Pastries
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
    allergens: ["Gluten", "Dairy", "Eggs"]
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
    allergens: ["Gluten", "Dairy", "Eggs"]
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
    allergens: ["Gluten"]
  }
];

export const categories = ["All", "Hot Coffee", "Cold Coffee", "Specialty", "Pastries", "Food"];
