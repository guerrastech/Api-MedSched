const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String },
  telefone: { type: String },
  cidade: { type: String },
  estado: { type: String },
  CEP: { type: String },
  especialidades: [{ type: String }]
});

module.exports = mongoose.model('Hospital', hospitalSchema);