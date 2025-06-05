const express = require('express');
const router = express.Router();
const controller = require('../controllers/medicoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/cadastrar', controller.cadastrarMedico);
router.put('/atualizarMedico/:id', controller.atualizarMedico);
router.get('/getById/:id', authMiddleware, controller.getMedicobyId);
router.get('/listarMedicos', controller.listarMedicos);
router.delete('/excluirMedico/:id', controller.excluirMedico);
router.get('/especialistas/:especialidade', controller.buscarPorEspecialidade);
router.get('/buscaPorHospital/:hospitalId', controller.buscarMedicoPorHospital);

module.exports = router;
