const express = require("express");
const router = express.Router();
const product_controller = require("../Controllers/product_controller.js") 


router.use(express.json());
var cors = require('cors')
const authrization = require("../middleware/auth.js")

router.use(cors(corsOptions));


var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
  };


  router.route("/jobformpost").post( product_controller.jobformpost);
router.route("/addproduct").post( product_controller.addproduct);
router.route("/updateproduct/:productId").put( product_controller.updateproduct);
router.route("/deleteproduct/:productId").delete( product_controller.deleteproduct);
router.route("/products").get(product_controller.getallproduct);
router.route("/get/:id").get(product_controller.getpostbyid);
router.route("/adminjobs").get(authrization, product_controller.getadminjob);

module.exports = router;