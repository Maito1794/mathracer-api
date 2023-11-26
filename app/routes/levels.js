const express = require('express');
const router = express.Router();
const { getUsersLevelsByCategory } = require('../controllers/levels');

router.get('/:nombreUsuario', getUsersLevelsByCategory);

module.exports = router;