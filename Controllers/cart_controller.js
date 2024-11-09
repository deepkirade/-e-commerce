const Cart = require("../models/cart_model")
const Product = require("../models/product_model")


const cartadd = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (quantity <= 0) return res.status(400).send("Quantity must be positive.");
    
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send("Product not found");
    
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
          cart = new Cart({ userId: req.user.id, products: [{ productId, quantity }] });
        } else {
          const productInCart = cart.products.find(p => p.productId.toString() === productId);
          if (productInCart) {
            productInCart.quantity += quantity;
          } else {
            cart.products.push({ productId, quantity });
          }
        }
        await cart.save();
        res.status(200).send({ message: "Product added to cart", cart });
      } catch (error) {
        res.status(500).send("Error adding product to cart");
      }
}


const cartupdate = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (quantity < 0) return res.status(400).send("Quantity cannot be negative.");
        if (!productId || !quantity) {
            return res.status(400).send(" productid and quantity required ");
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send("Cart not found");

        const productInCart = cart.products.find(p => p.productId.toString() === productId);
        if (!productInCart) return res.status(404).send("Product not found in cart");

        if (quantity == 0) {
            cart.products = cart.products.filter(p => p.productId.toString() !== productId);
            res.status(200).send({ message: "Cart removed" });
        } else {
            productInCart.quantity = quantity;
        }
        await cart.save();
        res.status(200).send({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).send("Error updating cart");
    }
}


const cartdelete = async (req, res) => {
    try {
        const { productId } = req.body;

        if(!productId){
            return res.status(400).send(" productId required ");
        }

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).send("Cart not found");

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex === -1) return res.status(404).send("Product not found in cart");

        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).send({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).send("Error deleting product from cart");
    }
}


const getcart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
      if (!cart || cart.products.length === 0) return res.status(404).send("Cart is empty");
  
      const total = cart.products.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);
      res.status(200).send({ cart, total });
    } catch (error) {
      res.status(500).send("Error retrieving cart");
    }
  };


 

module.exports = { cartadd, cartupdate, cartdelete, getcart }


