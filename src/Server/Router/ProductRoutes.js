const { Addproduct, Allproducts, SingleProduct, UpdateProduct, DeleteProduct, SearchProduct } = require("../Controllers/ProductControllers");
const Protect = require("../Middleware/Protect");
const router = require("express").Router();

router.post('/add-product',Protect,Addproduct)
router.get('/all-products',Protect,Allproducts)
router.get('/single-product/:id',Protect,SingleProduct)
router.put('/update-product/:id',Protect,UpdateProduct)
router.delete('/delete-product/:id',Protect,DeleteProduct)
router.get('/search-product/:key',Protect,SearchProduct)

module.exports = router;