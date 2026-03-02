const { Schema, model } = require('mongoose');

const guiaItinerarioSchema = new Schema({
  guia: {
    type: Schema.Types.ObjectId,
    ref: 'Guia',
    required: true
  },
  itinerario: {
    type: Schema.Types.ObjectId,
    ref: 'Itinerario',
    required: true
  },
  hora: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('GuiaItinerario', guiaItinerarioSchema);