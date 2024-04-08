const express=require('express');
const router=express.Router();
const Product=require("../modules/product.module.js");

const productController = require('../controller/product.controller.js');
router.get("/",productController.get_all);
router.post("/",productController.Add_product);
router.get("/:id",productController.get_product_byid);
router.put("/:id",productController.alter_product_byid);
router.delete("/:id",productController.delete_product);


module.exports=router;