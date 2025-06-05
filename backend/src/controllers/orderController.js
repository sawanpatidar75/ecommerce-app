const { Order, OrderItem, Product } = require('../models');

// Place an order
exports.placeOrder = async (req, res) => {
  const { customerName, customerEmail, customerAddress, cartItems } = req.body;
  try {
    // Create Order
    const order = await Order.create({
      customerName,
      customerEmail,
      customerAddress,
      UserId: req.user.id,
    });

    // Create OrderItems
    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        // Optionally: Validate product exists
        const product = await Product.findByPk(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        // Check if enough stock
        if (product.stock < item.quantity) {
          return res.status(400).json({
            message: `Not enough stock for ${product.name}. Available: ${product.stock}`,
          });
        }

        await OrderItem.create({
          OrderId: order.id,
          ProductId: item.productId,
          quantity: item.quantity,
          price: product.discountedPrice, // Store current price

        });
        // Subtract ordered quantity from product stock
        product.stock -= item.quantity;
        await product.save();

      })
    );

    res.status(201).json({
      message: 'Order placed successfully',
      order,
      orderItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get orders for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { UserId: req.user.id },
      include: [{ model: OrderItem, include: [{ model: Product }] }],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get orders for the logged-in user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {},
      include: [{ model: OrderItem, include: [{ model: Product }] }],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
