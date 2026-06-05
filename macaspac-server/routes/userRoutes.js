const express = require('express');
// import functions
const { getUsers, createUser, updateUser, deleteUser, loginUser, } = require('../controllers/userController');
const { authMiddleware, optionalAuthMiddleware, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(authMiddleware, requireAdmin, getUsers).post(optionalAuthMiddleware, createUser);

router.route('/:id').put(authMiddleware, requireAdmin, updateUser).delete(authMiddleware, requireAdmin, deleteUser);

router.post('/login', loginUser);

module.exports = router;
