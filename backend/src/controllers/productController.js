const { Op } = require('sequelize');
const { Product, Category } = require('../models');

// Add product
exports.addProduct = async (req, res) => {
  const { name, price, discountedPrice, description, categoryId, stock  } = req.body;
  try {
    // Process uploaded images
    const imagePaths = req.files.map((file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const product = await Product.create({
      name,
      images: imagePaths,
      price,
      discountedPrice,
      description,
      CategoryId: categoryId,
      stock
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit product
exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, discountedPrice, description, categoryId, stock  } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If new images are uploaded
    let images = product.images; // existing images
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
    }

    await product.update({
      name,
      price,
      discountedPrice,
      description,
      CategoryId: categoryId,
      images, // update images if new ones uploaded
      stock 
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products with optional filters
exports.getAllProducts = async (req, res) => {
  const { category, minPrice, maxPrice, name } = req.query;
  const whereClause = {};

  if (category) {
    whereClause.CategoryId = category;
  }

  if (minPrice || maxPrice) {
    whereClause.discountedPrice = {};
    if (minPrice) whereClause.discountedPrice[Op.gte] = parseFloat(minPrice);
    if (maxPrice) whereClause.discountedPrice[Op.lte] = parseFloat(maxPrice);
  }

  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` }; // case-insensitive search
  }

  try {
    const products = await Product.findAll({
      where: whereClause,
      include: [{ model: Category, attributes: ['name'] }],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product details
exports.getProductDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category, attributes: ['name'] }],
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
