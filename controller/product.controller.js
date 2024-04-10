const Product=require("../modules/product.module.js");

const get_all=async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  const Add_product=async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  const get_product_byid=async (req, res) => {
    try {
      var target = await Product.findOne({ id: req.params.id });
      if (!target) {
        // If no product is found with the specified ID, return a 404 Not Found error
        return res.status(404).send("Product not found");
      } else {
        // If a product is found, return it in the response
        return res.status(200).json(target);
      }
    } catch (error) {
      // If an error occurs during the database query, return a 500 Internal Server Error
      return res.status(500).json({ message: error.message });
    }
  }
  const alter_product_byid= async (req, res) => {
    try {
      var target = await Product.findOne({ id: req.params.id });
      if (!target) {
        // If no product is found with the specified ID, return a 404 Not Found error
        return res.status(404).send("Product not found");
      } else {
        // If a product is found, update its properties
        target.id=req.body.id || target.id;
        target.name = req.body.name || target.name;
        target.category = req.body.category || target.category;
        target.manufacturer = req.body.manufacturer || target.manufacturer;
        target.quantity = req.body.quantity || target.quantity;
        target.price = req.body.price || target.price;
        target.expirydate = req.body.expirydate || target.expirydate;
  
        // Save the updated product to the database
        await target.save();
  
        // Return the updated product in the response
        return res.status(200).json({ 
          message: "Product updated successfully",
          updatedProduct: target
        });
      }
    } catch (error) {
      // If an error occurs during the database operation, return a 500 Internal Server Error
      return res.status(500).json({ message: error.message });
    }
  }
  const delete_product=async(req,res)=>{
    try{
      var target=await Product.deleteOne({id:req.params.id});
      if(target.deletedCount==1){
          res.status(200).json({
            message: "Product deleted success",
            updatedProduct: target
          }
          )
        
      }
      else{
        res.status(404).json({message:"not found"});
      }
  
    }
   catch(error){
    res.status(500).json({message:error.message}); 
  }
  }
  module.exports={
   get_all,
   Add_product,
   get_product_byid,
   alter_product_byid,
   delete_product

  };