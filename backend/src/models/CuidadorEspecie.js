const { Schema, model } = require('mongoose');

const cuidadorEspecieSchema = new Schema({
  cuidador: {
    type: Schema.Types.ObjectId,
    ref: 'Cuidador',
    required: true
  },
  especie: {
    type: Schema.Types.ObjectId,
    ref: 'Especie',
    required: true
  },
  fechaAsignacion: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('CuidadorEspecie', cuidadorEspecieSchema); 