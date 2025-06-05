const mongoose = require("mongoose")

const medicoScheme = mongoose.Schema({  
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        unique: true,
        required: true
    },
    genero:{
        type: String,
        required: true
    },
    especialidade:{
        type: String,
        enum: ["Dentista", 'Ortoprdia', 'Clinico Geral', 'Oftalmologista', 'Dermatologista', 'Ginecologista'],
        required: true
    },
    CRM:{
        type: String,
        required: true
    },
    hospital:{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
    UF:{
        type: String,
        required: true
    },
    telefone:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    descricao:{
        type: String
    },
    img:{
        type: String,
        required: true
    }
});


const Medico = mongoose.model("Medico",medicoScheme);

module.exports = Medico;