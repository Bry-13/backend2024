const { Router } = require('express');
const { getAllProducts_suppliers, getProducts_suppliersById, createProducts_suppliers, updateProducts_suppliers, deleteProducts_suppliers } = require('../controllers/products_suppliers');
const router = Router();
router.get('/', getAllProducts_suppliers);
router.get('/:id', getProducts_suppliersById);
router.post('/', createProducts_suppliers);
router.put('/:id', updateProducts_suppliers);
router.delete('/:id', deleteProducts_suppliers);
module.exports = router;