const { Schema, model } = require("mongoose");
const ROLES = require('../enums/rol.enum'); 

const usuarioSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: Object.values(ROLES),
        default: ROLES.CUIDADOR,
      required: true,
    },
    
  },
  {
    timestamps: true,
  },
);

module.exports = model("Usuario", usuarioSchema);
