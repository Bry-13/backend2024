const {Router} = require('express');
const {getAllUsers, getUserById, addUser, loginUser, updateUser, deleteUser} = require('../controllers/users');

const router =Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;