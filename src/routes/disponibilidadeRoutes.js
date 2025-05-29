const express = require('express');
const router = express.Router();
const controller = require('../controllers/disponibilidadeController');

router.post('/', controller.cadastrarDisponibilidade);
router.get('/', controller.buscarDisponibilidades);

module.exports = router;
