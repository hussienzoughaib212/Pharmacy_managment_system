const express = require('express');
const mongoose = require('mongoose');
const Product = require("./modules/product.module.js");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const url = "mongodb://localhost:27017/pharmacy-db";

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.get("/products/:id", async (req, res) => {
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
});
app.put("/products/:id", async (req, res) => {
  try {
    var target = await Product.findOne({ id: req.params.id });
    if (!target) {
      // If no product is found with the specified ID, return a 404 Not Found error
      return res.status(404).send("Product not found");
    } else {
      // If a product is found, update its properties
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
});
app.delete("/products/:id",async(req,res)=>{
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
});
app.get("/products/search", async (req, res) => {
  try {
    // Extract the search query from the request query parameters
    const searchTerm = req.query.q;

    // Perform a search in the database based on the search query
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search by name
        { category: { $regex: searchTerm, $options: "i" } },
        {price: { $regex: searchTerm, $options: "i" } },
      ]
    });

    // Return the search results in the response
    res.status(200).json(products);
  } catch (error) {
    // If an error occurs during the database operation, return a 500 Internal Server Error
    res.status(500).json({ message: error.message });
  }
});


mongoose.connect(url)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log("Cannot connect to database:", error));


app.listen(9000, () => console.log("Listening on port 9000"));
