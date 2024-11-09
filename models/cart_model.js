const mongoose= require("mongoose");



const cartSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[
        {
      productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'
        
    },
    quantity:{
       type:Number,
      required:true
    }}
    ]
})

const cart = mongoose.model("cart",cartSchema);
module.exports = cart;