const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@sysmed.nsdkjcc.mongodb.net/')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

module.exports = mongoose;
