const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
    {

        id:{
            type:Number,
            required:true

        },
        name: {
            type: String,
            required: [true, "please enter a product"]
        },
        catigory:{
            type:String,
            required: [true, "please enter the category"]
        },
        manufacturer:{
            type:String,
            required: [true, "please enter the manifacture"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
       expiratdate:{
        type:String,
        equired: [true, "please enter the expiary date"]
       }

      
    },
    {
        timestamps: true
    }
);
const Product=mongoose.model("Product",ProductSchema);
module.exports=Product