const { Router } = require('express');
const { getAllStaff, getStaffById, addStaff, updateStaff, deleteStaff } = require('../controllers/staff');

const router = Router();

router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.post('/', addStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

module.exports = router;