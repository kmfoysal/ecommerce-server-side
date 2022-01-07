const router = require('express').Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');


//GET Single PRODUCT
router.get("/singleproduct/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL PRODUCTS
  router.get("/allproducts", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// Add Product 
router.post('/addproduct', verifyTokenAndAdmin, async(req, res)=>{
    const newProduct = new Product(req.body);

    try {
        const addProduct = await newProduct.save();
        res.status(200).json(addProduct);
    } catch (err) {
        res.status(500).json(err)
    }
})


// Update Product 

router.put('/updateproduct/:id', verifyTokenAndAdmin, async(req, res)=>{
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new : true
            }
        );
        res.status(200).json(updateProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE PRODUCT
router.delete("/deleteproduct/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;