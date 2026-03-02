const { Schema, model } = require('mongoose')

const habitatSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    clima: {
      type: String,
      required: true,
      trim: true
    },
    vegetacion: {
      type: String,
      required: true,
      trim: true
    },
    continentes: {
      type: [String], // Array de strings
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Habitat', habitatSchema) 