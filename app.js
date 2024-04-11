const express = require('express');
const mongoose = require('mongoose');
const Product = require("./modules/product.module.js");

const productRoute = require("./routes/product.rout.js");
const supplierRoute=require("./routes/supllier.rout.js")
const app = express();
class ProductFilter {
  static async validateProduct(req, res, next) {
    
    try {
      const errors=[];
      // Check if the price or the quantity is negative:
      if (req.body.price < 0 ) {
        errors.push("the price is negative!");
      }
      if (req.body.quantity < 0 ) {
        errors.push("the quantity is negative!");
      }
      

      // Check if the product ID already exists:
      const existingProduct = await Product.findOne({ id: req.body.id });
      if (existingProduct) {
        errors.push("product already exist");
      }
      const expdate=new Date(req.body.expiryDate);
      if(expdate<=new Date()){
        errors.push("the product is expired!");

      }
      if(errors.length>0){
        return res.status(400).json({errors});
      }
      // Call the next middleware if all checks pass:
      next();
    } catch (error) {
      // If an error occurs during validation, pass it to the error handler middleware:
      next(error);
    }
  }
}

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(ProductFilter.validateProduct);
app.use("/products",productRoute);
app.use("/supplier",supplierRoute)
const url = "mongodb://localhost:27017/pharmacy-db";








mongoose.connect(url)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log("Cannot connect to database:", error));


app.listen(9000, () => console.log("Listening on port 9000"));
