const router = require('express').Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require('./verifyToken');


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
})


module.exports = router;