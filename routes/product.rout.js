const express=require('express');
const product=express.Router();


const productController = require('../controller/product.controller.js');
product.get("/",productController.get_all);
product.post("/",productController.Add_product);
product.get("/:id",productController.get_product_byid);
product.put("/:id",productController.alter_product_byid);
product.delete("/:id",productController.delete_product);


module.exports=product;