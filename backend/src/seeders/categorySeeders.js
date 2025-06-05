const { Category } = require('../models');

const seedCategories = async () => {
  try {
    const categories = [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Home & Kitchen' },
      { name: 'Books' },
      { name: 'Sports' },
    ];

    // Use bulkCreate to insert data
    await Category.bulkCreate(categories);
    console.log('✅ Categories seeded successfully.');
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  }
};

module.exports = seedCategories;
