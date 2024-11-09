const express = require("express");
const router = express.Router();
const order_controller = require("../Controllers/order_controler.js") 


router.use(express.json());
var cors = require('cors')
const authrization = require("../middleware/auth.js")

router.use(cors(corsOptions));


var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
  };


  router.route("/placeorder").post(authrization, order_controller.placeorder);
  router.route("/getallorders").get(authrization, order_controller.getallorder);
  router.route("/orders/customer/:customerId").get(authrization, order_controller.getorderbycustomerid);
 

module.exports = router;