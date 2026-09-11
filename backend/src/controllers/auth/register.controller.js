const Usuario = require("../../models/Usuario");
const { createAccessToken } = require("../../libs/jwt");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password, username, rol } = req.body;

    const userFound = await Usuario.findOne({ email });

    if (userFound) {
      return res.status(400).json({
        message: "El email ya existe",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUsuario = new Usuario({
      username,
      email,
      password: passwordHash,
      rol,
    });

    const userSaved = await newUsuario.save();

    const token = await createAccessToken({
      id: userSaved._id,
      rol: userSaved.rol,
    });

    res.cookie("token", token);

    res.status(201).json({
      message: "Usuario creado correctamente",
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      rol: userSaved.rol,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = register;