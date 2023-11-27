const express = require('express');
const router = express.Router();
const { getUsersLevels } = require('../controllers/levels');

router.get('/:nombreUsuario', getUsersLevels);


module.exports = router;