const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const authMiddleware = require('../middlewares/authMiddleware');


router.post("/cadastrar", pacienteController.cadastrarPaciente);
router.put("/atualizar/:id", pacienteController.atualizarPaciente);
router.get('/getById/:id',  authMiddleware, pacienteController.getPacientebyId);
router.delete("/deletar/:id", pacienteController.deletarPaciente);
router.get("/listar", pacienteController.listarPacientes);


module.exports = router;