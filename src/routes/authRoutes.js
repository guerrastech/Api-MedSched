const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/login/medico', controller.loginMedico);
router.post('/login/paciente', controller.loginPaciente);

module.exports = router;
