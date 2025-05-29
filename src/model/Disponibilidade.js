const mongoose = require('mongoose');

const disponibilidadeSchema = new mongoose.Schema({
  medico:     { type: mongoose.Schema.Types.ObjectId, ref: 'Medico', required: true },
  hospital:   { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  data:       { type: Date, required: true },
  horarios:   [{ type: String, enum: ['07:00','07:30','08:00','08:30','09:00','09:30'] }]
});

module.exports = mongoose.model('Disponibilidade', disponibilidadeSchema);
