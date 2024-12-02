const { Router } =require('express');
const { getAllUsers } = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id');
router.post('/');
router.put('/:id');
router.delete('/:id');

module.exports = router;