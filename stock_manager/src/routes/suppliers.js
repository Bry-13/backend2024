const { Router } = require('express');
const { getAllSupp, getSuppByRfc, addSupp, updateSuppByRfc, deleteSupp } = require('../controllers/suppliers');
const router = Router();

router.get('/', getAllSupp);
router.get('/rfc/:rfc', getSuppByRfc);
router.post('/', addSupp);
router.put('/rfc/:rfc', updateSuppByRfc);
router.delete('/rfc/:rfc', deleteSupp);
module.exports = router;