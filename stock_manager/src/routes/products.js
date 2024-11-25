const { Router } = require('express');
const { getAllProducts, getProductsById, createProducts, updateProducts, deleteProducts } = require('../controllers/products');
const router = Router();
router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/', createProducts);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProducts);
module.exports = router;