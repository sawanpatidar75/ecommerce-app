const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Import models
const User = require('./user')(sequelize, DataTypes);
const Category = require('./category')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const OrderItem = require('./orderItem')(sequelize, DataTypes);

// Associations
User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  OrderItem,
};
