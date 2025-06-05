const mongoose = require('mongoose');
require('dotenv').config();

const USER_BD = process.env.USER_BD; 
const PASSWORD_BD = process.env.PASSWORD_BD; 


mongoose.connect(`mongodb+srv://${USER_BD}:${PASSWORD_BD}@sysmed.nsdkjcc.mongodb.net/`)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

module.exports = mongoose;
