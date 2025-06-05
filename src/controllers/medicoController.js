const Medico = require('../model/Medico');
const bcrypt = require('bcryptjs');


exports.cadastrarMedico = async (req, res) => {
  try {
    const dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 10);

    const novoMedico = await Medico.create(dados);
    res.status(201).json(novoMedico);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar médico' });
  }
};

exports.atualizarMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    const medicoAtualizado = await Medico.findByIdAndUpdate(id, dadosAtualizados, { new: true, runValidators: true });

    if (!medicoAtualizado) {
      return res.status(404).json({ erro: 'Médico não encontrado' });
    }

    res.status(200).json(medicoAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar médico' });
  }
};

exports.getMedicobyId = async (req, res) => {
    try{
        const {id} = req.params;
        const medico = await Medico.findById(id); 

        if (!medico) {
            return res.status(404).json({ error: "Nenhum médico encontrado" });
        }

        res.status(200).json(medico);
    }catch (erro){
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao procurar médico' });
    }
};

exports.listarMedicos = async (req, res) => {
  try {
    const medicos = await Medico.find();
    res.json(medicos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar médicos" });
  }
};

exports.buscarPorEspecialidade = async (req, res) => {
  try {
    const { especialidade } = req.params; 

    if (!especialidade) {
      return res.status(400).json({ erro: 'Especialidade é obrigatória' });
    }

    const medicos = await Medico.find({ especialidade: especialidade });

    if (medicos.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum médico encontrado para essa especialidade' });
    }

    res.status(200).json(medicos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar médicos por especialidade' });
  }
};

exports.buscarMedicoPorHospital = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    if (!hospitalId) {
      return res.status(400).json({ erro: 'ID do hospital é obrigatório' });
    }

    const medicos = await Medico.find({ hospital: hospitalId });

    if (medicos.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum médico encontrado para esse hospital' });
    }

    res.status(200).json(medicos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar médicos por hospital' });
  }
};

exports.excluirMedico = async (req, res) => {
  try {
    const id = req.params.id;
    const medico = await Medico.findByIdAndDelete(id);

    if (!medico) {
      return res.status(404).json({ erro: "Médico não encontrado" });
    }

    res.json({ mensagem: "Médico excluído com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao excluir médico" });
  }
};


