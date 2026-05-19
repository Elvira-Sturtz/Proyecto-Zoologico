const Usuario = require("../models/Usuario");

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const newUsuario = new Usuario({
      username,
      email,
      password,
    });

    await newUsuario.save();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    res.send("login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
