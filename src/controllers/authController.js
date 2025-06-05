const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Medico = require('../model/Medico');
const Paciente = require('../model/Paciente');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const gerarToken = (id, tipo) => {
  return jwt.sign({ id, tipo }, SECRET_KEY, { expiresIn: '1d' });
};

exports.loginMedico = async (req, res) => {
  const { cpf, password } = req.body;

  try {
    const medico = await Medico.findOne({ cpf }).select('+password');

    if (!medico || !(await bcrypt.compare(password, medico.password))) {
      return res.status(401).json({ mensagem: 'cpf ou senha inválidos' });
    }

    const token = gerarToken(medico._id, 'medico');
    res.json({ token, id: medico._id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};

exports.loginPaciente = async (req, res) => {
  const { cpf, password } = req.body;

  try {
    const paciente = await Paciente.findOne({ cpf }).select('+password');

    if (!paciente || !(await bcrypt.compare(password, paciente.password))) {
      return res.status(401).json({ mensagem: 'CPF ou senha inválidos' });
    }

    const token = gerarToken(paciente._id, 'paciente');
    res.json({ token, id: paciente._id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};
