const { Schema, model } = require('mongoose')

const itinerarioSchema = new Schema(
  {
    codigo: {
      type: String,
      required: true,
      trim: true, 
      unique: true
    },
    duracion: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    maxVisitantes: {
        type: Number,
        required: true
    },
    zonas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Zona',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = model('Itinerario', itinerarioSchema)