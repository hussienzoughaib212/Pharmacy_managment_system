const Supplier = require("../modules/supplier.module.js");




  const Add_supplier=async (req, res) => {
    try {
      const supplier = await Supplier.create(req.body);
      res.status(200).json(supplier);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  const get_All=async(req,res)=>{
    try{
      const suppliers=await Supplier.find()
      return res.status(200).json(suppliers)

    }
    catch(error){
      res.status(500).json({message:error.message})
    }
  }
 
  module.exports={
  Add_supplier,

  };
 