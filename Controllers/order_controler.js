const Cart = require("../models/cart_model")
const Order = require("../models/order_model")
const User = require("../models/user-model")
const Product = require("../models/product_model")

const placeorder = async (req, res) => {
    try {
        const { shippingDetails } = req.body;

        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        if (!cart || cart.products.length === 0) return res.status(400).send("Cart is empty");

        const total = cart.products.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

        const order = new Order({
            userId: req.user.id,
            products: cart.products.map(item => ({ productId: item.productId._id, quantity: item.quantity })),
            total,
            shippingDetails
        });

        await order.save();
        await Cart.findOneAndDelete({ userId: req.user.id });

        res.status(200).send({ message: "Order placed successfully", orderId: order._id });
    } catch (error) {
        res.status(500).send("Error placing order");
    }
};

// .populate('userId', 'name email').populate('products.productId', 'name price');

const getallorder = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate({
          path: 'userId',
          select: 'name email',
        })
        .populate({
          path: 'products.productId', // Nested path for array field
          model: 'product',           // Model for product population
          select: 'name price',       // Fields to include from Product model
        });
      
      res.status(200).send(orders);
      
      res.status(200).send(orders);
      } catch (error) {
        res.status(500).send("Error retrieving orders");
      }
    }

    const getorderbycustomerid= async (req, res) => {
        try {
          const { customerId } = req.params;
          const orders = await Order.find({ userId: customerId }).populate('products.productId', 'name price');
          if (!orders.length) return res.status(404).send("No orders found for this customer");
      
          res.status(200).send(orders);
        } catch (error) {
          res.status(500).send("Error retrieving customer orders");
        }
      };
    

module.exports = { placeorder, getallorder, getorderbycustomerid }
