var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Noticias = new Schema({
  titulo: {
    type: String,
  },
  id: {
    type: Number,
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('noticias', Noticias);
