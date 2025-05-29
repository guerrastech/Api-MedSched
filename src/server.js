const express = require('express');
const mongoose = require('./database/conectionDatabase');
const app = express();
app.use(express.json());

const disponibilidadeRoutes = require('./routes/disponibilidadeRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');

app.use('/api/disponibilidades', disponibilidadeRoutes);
app.use('/api/hospitais', hospitalRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/pacientes', pacienteRoutes)

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
