const app = require('./app');
const { connectDB } = require('./config/db');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to DB
    await connectDB();

    // Sync DB models (create tables if they don’t exist)
    await sequelize.sync({ alter: false }); // use { force: true } to drop tables (not recommended in production)

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();
