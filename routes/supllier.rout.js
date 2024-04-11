const express=require('express');
const sup=express.Router();
const suppControler=require("../controller/Supplier.controler.js")

sup.post("/",suppControler.Add_supplier);

module.exports=sup;