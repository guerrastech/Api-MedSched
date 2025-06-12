const Consulta = require("../model/Consulta");

exports.marcarConsulta = async (req, res) => {
  try {
    const { paciente, medico, hospital, date, horario, documento,status,diagnostico,encamiamento,observacoes } = req.body;

    if (!paciente || !medico || !hospital || !date || !horario) {
      return res.status(400).json({ erro: "Campos paciente, médico, hospital, data e horário são obrigatórios" });
    }

    const novaConsulta = new Consulta({
      paciente,
      medico,
      hospital,
      date: new Date(date),
      horario,
      documento,
      status,
      diagnostico,
      encamiamento,
      observacoes

    });

    await novaConsulta.save();

    res.status(201).json(novaConsulta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao marcar consulta" });
  }
};

exports.consultasDoMedicoPorData = async (req, res) => {
  try {
    const { medicoId, data } = req.query;

    if (!medicoId || !data) {
      return res.status(400).json({ erro: "medicoId e data são obrigatórios" });
    }

    // Criar intervalo do dia: do começo até o fim do dia
    const inicioDia = new Date(data);
    inicioDia.setHours(0, 0, 0, 0);

    const fimDia = new Date(data);
    fimDia.setHours(23, 59, 59, 999);

    const consultas = await Consulta.find({
      medico: medicoId,
      date: { $gte: inicioDia, $lte: fimDia }
    })
    .populate("paciente", "nome email telefone")  
    .populate("hospital", "nome endereco"); 

    res.json(consultas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar consultas do médico" });
  }
};

exports.consultasDoPaciente = async (req, res) => {
  try {
    const pacienteId = req.params.pacienteId;

    const consultas = await Consulta.find({ paciente: pacienteId })
      .populate("medico", "nome telefone especialidade")   
      .populate("hospital", "nome endereco telefone") 
      .sort({ date: 1, horario: 1 }); 

    res.json(consultas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar consultas do paciente" });
  }
};

exports.atualizarConsulta = async (req, res) => {
  try {
    const consultaId = req.params.id;
    const dadosAtualizados = req.body;

    const consultaAtualizada = await Consulta.findByIdAndUpdate(
      consultaId,
      dadosAtualizados,
      { new: true } 
    );

    if (!consultaAtualizada) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }

    res.json(consultaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar consulta" });
  }
};

exports.cancelarConsulta = async (req, res) => {
  try {
    const consultaId = req.params.id;

    const consultaDeletada = await Consulta.findByIdAndDelete(consultaId);

    if (!consultaDeletada) {
      return res.status(404).json({ erro: "Consulta não encontrada" });
    }

    res.json({ mensagem: "Consulta cancelada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cancelar consulta" });
  }
};

exports.getConsultaById = async (req, res) => {
  try {
    const { id } = req.params;

    const consulta = await Consulta.findById(id)
      .populate("medico")
      .populate("hospital");

    if (!consulta) {
      return res.status(404).json({ mensagem: "Consulta não encontrada" });
    }

    res.json(consulta);
  } catch (error) {
    console.error("Erro ao buscar consulta por ID:", error);
    res.status(500).json({ mensagem: "Erro ao buscar consulta" });
  }
};


