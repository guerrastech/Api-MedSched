const mongoose = require('mongoose');


const consultaScheme = mongoose.Schema({
    paciente: {type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true},
    medico: { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
    hospital:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    date: {type: Date, required: true},
    horario: {type: String, required: true},
    documento: {type: String},
    criadoEm: { type: Date, default: Date.now }
});

const Consulta = mongoose.model("Consulta",consultaScheme);

module.exports = Consulta;


