const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/cadastrar', hospitalController.cadastrarHospital);
router.delete("/deletar/:id", hospitalController.deletarHospital);
router.put("/atualizar/:id", hospitalController.atualizarHospital);
router.get("/listarHospitais", hospitalController.listarHospitais);
router.get("/listarPorId/:id", hospitalController.listarHospitalPorId);

module.exports = router;
