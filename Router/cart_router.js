const express = require("express");
const router = express.Router();
const cart_controller = require("../Controllers/cart_controller.js") 


router.use(express.json());
var cors = require('cors')
const authrization = require("../middleware/auth.js")

router.use(cors(corsOptions));


var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
  };


  router.route("/cart/add").post(authrization, cart_controller.cartadd);
  router.route("/cart/update").put(authrization, cart_controller.cartupdate);
  router.route("/cart/delete").delete(authrization, cart_controller.cartdelete);
  router.route("/cart").get(authrization, cart_controller.getcart);


module.exports = router;