const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");


router.post("/cadastrar", pacienteController.cadastrarPaciente);
router.put("/atualizar/:id", pacienteController.atualizarPaciente);
router.delete("/deletar/:id", pacienteController.deletarPaciente);
router.get("/listar", pacienteController.listarPacientes);


module.exports = router;