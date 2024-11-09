const express = require("express");
const router = express.Router();
const authcontrollers = require("../Controllers/user-controller.js") 

router.use(express.json());
var cors = require('cors')
const authrization = require("../middleware/auth.js")

router.use(cors(corsOptions));


var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
  };




// router.get("/",(req,res)=>{

//     res.status(200).send("welcome by Router");

// });

router.route("/").get( authcontrollers.home);
router.route("/signup").post( authcontrollers.signup);
router.route("/signin").post(authcontrollers.signin);
router.route("/logout").get(authrization ,authcontrollers.logout);




module.exports = router;