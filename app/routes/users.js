
const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserByNombreUsuario,
    createUser,
    updateUserAvatar,
    updateUserCar,
    updateUserType,
    updateUserEmail,
    updateUserPassword,
} = require('../controllers/users');

// GET /users
router.get('/', getAllUsers);

// GET /users/:nombreUsuario
router.get('/:nombreUsuario', getUserByNombreUsuario);

// POST /users
router.post('/', createUser);

// PUT /users/email/:nombreUsuario
router.put('/correo/:nombreUsuario', updateUserEmail);

// PUT /users/avatar/:nombreUsuario
router.put('/avatar/:nombreUsuario', updateUserAvatar);

// PUT /users/car/:nombreUsuario
router.put('/auto/:nombreUsuario', updateUserCar);

// PUT /users/type/:nombreUsuario
router.put('/tipo/:nombreUsuario', updateUserType);

// PUT /users/password/:nombreUsuario
router.put('/password/:nombreUsuario', updateUserPassword);

module.exports = router;
