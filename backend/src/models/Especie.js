const { Schema, model } = require('mongoose')

const especieSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    nombreCientifico: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    zona: {
      type: Schema.Types.ObjectId,
      ref: 'Zona',
      required: true
    },
    habitats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Habitat',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = model('Especie', especieSchema)