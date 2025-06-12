const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consultaController");

router.post("/marcar", consultaController.marcarConsulta);
router.get("/medico-consultas", consultaController.consultasDoMedicoPorData);
router.get("/paciente-consultas/:pacienteId", consultaController.consultasDoPaciente);
router.put("/atualizarConsulta/:id", consultaController.atualizarConsulta);
router.delete("/cancelarConsulta/:id", consultaController.cancelarConsulta);
router.get("/consultas/:id", consultaController.getConsultaById);


module.exports = router;
