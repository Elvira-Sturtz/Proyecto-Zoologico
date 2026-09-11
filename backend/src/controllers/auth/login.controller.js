const Usuario = require("../../models/Usuario");
const { createAccessToken } = require("../../libs/jwt");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await Usuario.findOne({ email });

    if (!userFound) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      rol: userFound.rol,
    });

    res.cookie("token", token);

    res.status(200).json({
      message: "Inicio de Sesión correcto",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      rol: userFound.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = login;