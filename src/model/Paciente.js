const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

const pacienteScheme = mongoose.Schema({  
    cpf:{
        type: String,
        unique: true,
        required: true
    },
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    telefone:{
        type: String,
        required: true
    },
    nascimento:{
        type: String,
        required: true
    },
    genero:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    img: {
        type: String,
        required: true,
    },

});


pacienteScheme.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});



const Paciente = mongoose.model("Paciente",pacienteScheme);

module.exports = Paciente;