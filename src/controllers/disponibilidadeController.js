const Disponibilidade = require('../model/Disponibilidade');
const Medico = require('../model/Medico');

exports.cadastrarDisponibilidade = async (req, res) => {
  try {
    const novaDisponibilidade = await Disponibilidade.create(req.body);
    res.status(201).json(novaDisponibilidade);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar disponibilidade' });
  }
};

exports.buscarDisponibilidades = async (req, res) => {
  const { especialidade, hospitalId } = req.query;
  try {
    const medicos = await Medico.find({ especialidade, hospital: hospitalId });
    const medicoIds = medicos.map(m => m._id);

    const disponibilidades = await Disponibilidade.find({
      medico: { $in: medicoIds },
      hospital: hospitalId
    }).populate('medico', 'nome especialidade');

    res.json(disponibilidades);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar disponibilidades' });
  }
};
