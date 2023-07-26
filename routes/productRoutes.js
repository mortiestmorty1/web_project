const express= require('express');
const router= express.Router();
const productController= require('../controller/productController');

router.post('/addProduct', productController.addProduct);
router.put('/updateProduct/:title', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports= router;