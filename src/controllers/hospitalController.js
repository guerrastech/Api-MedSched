const Hospital = require('../model/Hospital');

exports.cadastrarHospital = async (req, res) => {
  try {
    const novoHospital = new Hospital(req.body);
    await novoHospital.save();
    res.status(201).json(novoHospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao cadastrar hospital' });
  }
};

exports.atualizarHospital = async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const hospitalAtualizado = await Hospital.findByIdAndUpdate(hospitalId, req.body, {
      new: true, 
      runValidators: true 
    });

    if (!hospitalAtualizado) {
      return res.status(404).json({ erro: "Hospital não encontrado" });
    }

    res.json(hospitalAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar hospital" });
  }
};

exports.deletarHospital = async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const hospitalDeletado = await Hospital.findByIdAndDelete(hospitalId);

    if (!hospitalDeletado) {
      return res.status(404).json({ erro: "Hospital não encontrado" });
    }

    res.json({ mensagem: "Hospital deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar hospital" });
  }
};

exports.listarHospitais = async (req, res) => {
  try {
    const hospitais = await Hospital.find();
    res.json(hospitais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao listar hospitais" });
  }
};

exports.listarHospitalPorId = async (req, res) => {
  try {
    const hospitalId = req.params.id;
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ erro: "Hospital não encontrado" });
    }

    res.json(hospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar hospital" });
  }
};

exports.listarHospitaisPorEspecialidade = async (req, res) => {
  try {
    const especialidade = req.params.especialidade;

    if (!especialidade) {
      return res.status(400).json({ erro: "Informe a especialidade para busca" });
    }

    
    const hospitais = await Hospital.find({ especialidades: especialidade });

    res.json(hospitais);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar hospitais por especialidade" });
  }
};
