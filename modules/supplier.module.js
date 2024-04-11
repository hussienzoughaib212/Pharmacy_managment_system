const mongoose = require("mongoose");
const SupplierSchema = mongoose.Schema(
    {

        id:{
            type:Number,
            required:true

        },
        name: {
            type: String,
            required: [true, "please enter the name of the supplier"]
        },
        address:{
            type:String,
            required: [true, "please enter the address"]
        },
        contactperson:{
            type:String,
            required: [true, "please enter contactperson"]

        },
     

      
    },
    {
        timestamps: true
    }
);
const Supplier=mongoose.model("Supplier",SupplierSchema);
module.exports=Supplier;