const express = require("express")
const app = express();

const userrouter = require("./Router/user-router")
const productrouter = require("./Router/product-router")
const cartrouter = require("./Router/cart_router.js")
const orderrouter = require("./Router/order_router.js")
const connectDb = require("./utils/db.js")
app.use("/",userrouter, productrouter, cartrouter, orderrouter);
const env = require('dotenv').config()



  const PORT = process.env.port
 



connectDb().then(()=>{
    
app.listen(PORT,()=>{
    console.log(`server connection seccessfully at port ${PORT}`)
});
});



app.get("/",(req,res)=>{

    res.status(200).send("welcome by Server");

});


// app.get("/jobpost", async (req,res)=>{

    // let  samplejobpost = new jobpost({
    //     Name:"deepak",
    //     CompanyName :"tcs",
    //     EmailId:"tcs@gmail.com",
    //     MobileNo: 12345,
    //     YourDesignation:"hr", 
    //     Position:"software eng",
    //      Candidates:2,
    // }) 
//     await samplejobpost.save();
//     console.log("sample saved")

//     res.send("sample saved")

// });

// app.get("/delet", async (req,res)=>{

//     await jobpost.deleteMany({})
//     res.send("delet succesfully")

// });


