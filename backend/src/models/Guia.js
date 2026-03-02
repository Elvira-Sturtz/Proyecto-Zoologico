const { Schema, model } = require('mongoose')

const guiaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    direccion: {
      type: String,
      required: true,
      trim: true
    },
    telefono: {
      type: String,
      required: true,
      trim: true
    },
    fechaIngreso: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Guia', guiaSchema)