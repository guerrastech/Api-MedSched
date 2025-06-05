const Paciente = require("../model/Paciente");

exports.cadastrarPaciente = async (req, res) => {
  try {
    const novoPaciente = new Paciente(req.body);
    await novoPaciente.save();

    const pacienteRetorno = novoPaciente.toObject();
    delete pacienteRetorno.password;

    res.status(201).json(pacienteRetorno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar paciente" });
  }
};

exports.getPacientebyId = async (req, res) => {
    try{
        const {id} = req.params;
        const paciente = await Paciente.findById(id); 

        if (!paciente) {
            return res.status(404).json({ error: "Nenhum paciente encontrado" });
        }

        res.status(200).json(paciente);
    }catch (erro){
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao procurar paciente' });
    }
};

exports.atualizarPaciente = async (req, res) => {
  try {
    const pacienteAtualizado = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!pacienteAtualizado) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    const retorno = pacienteAtualizado.toObject();
    delete retorno.password;

    res.json(retorno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar paciente" });
  }
};

exports.deletarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByIdAndDelete(req.params.id);

    if (!paciente) {
      return res.status(404).json({ erro: "Paciente não encontrado" });
    }

    res.json({ mensagem: "Paciente deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar paciente" });
  }
};

exports.listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find({}, '-password');
    res.json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar pacientes" });
  }
};
