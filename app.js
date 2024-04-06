const express = require('express');
const mongoose = require('mongoose');
const Product = require("./modules/product.module.js");
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

const url = "mongodb://localhost:27017/pharmacy-db";

app.get("/products/getall", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/products/add", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

mongoose.connect(url)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log("Cannot connect to database:", error));


app.listen(9000, () => console.log("Listening on port 9000"));
