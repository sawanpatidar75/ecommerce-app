// backend/src/seeders/runSeeder.js
const { connectDB } = require('../config/db');
const seedCategories = require('./categorySeeders');
const { sequelize } = require('../models');

const runSeeder = async () => {
  try {
    await connectDB();
    await seedCategories();
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeeder();
