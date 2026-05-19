const { Schema, model } = require("mongoose");

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
      enum: ["admin", "guia", "cuidador"],
      required: true,
    },
    guia: {
      type: Schema.Types.ObjectId,
      ref: "Guia",
    },
    cuidador: {
      type: Schema.Types.ObjectId,
      ref: "Cuidador",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Usuario", usuarioSchema);
