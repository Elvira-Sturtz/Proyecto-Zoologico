const Usuario = require("../models/Usuario");

const { creaateAccessToken, createAccessToken } = require("../libs/jwt");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUsuario = new Usuario({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUsuario.save();

    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.status(201).json({
      message: "Usuario creado correctamente",
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
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
