const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,    // Database name
  process.env.DB_USER,    // MySQL username
  process.env.DB_PASS,    // MySQL password
  {
    host: process.env.DB_HOST, // Database host (e.g., 'localhost')
    dialect: 'mysql',          // We’re using MySQL
    logging: false,            // Disable SQL query logs (optional)
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
