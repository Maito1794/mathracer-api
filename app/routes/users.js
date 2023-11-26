
const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserByUsername,
    createUser,
    updateUserAvatar,
    updateUserCar,
    updateUserType,
    updateUserEmail,
    updateUserPassword,
} = require('../controllers/users');

// GET /users
router.get('/', getAllUsers);

// GET /users/:username
router.get('/:username', getUserByUsername);

// POST /users
router.post('/', createUser);

// PUT /users/email/:username
router.put('/email/:username', updateUserEmail);

// PUT /users/avatar/:username
router.put('/avatar/:username', updateUserAvatar);

// PUT /users/car/:username
router.put('/car/:username', updateUserCar);

// PUT /users/type/:username
router.put('/type/:username', updateUserType);

// PUT /users/password/:username
router.put('/password/:username', updateUserPassword);

module.exports = router;
