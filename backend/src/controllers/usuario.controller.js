const usuarioCtrl = {};

const Usuario = require("../models/Usuario");

// Obtener todos los Usuarios
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Crear Usuario
usuarioCtrl.createUsuario = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;

    const newUsuario = new Usuario({
        username, 
        email, 
        password, 
        rol,
    });

    await newUsuario.save();
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener Usuario por ID
usuarioCtrl.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar Usuario
usuarioCtrl.deleteUsuario = async (req, res) => {
  try {
    const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!deletedUsuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar Usuario
usuarioCtrl.updateUsuario = async (req, res) => {
  try {
    const { username, email, password, rol } = req.body;

    const updatedUsuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { username, email, password, rol },
      { new: true },
    );

    if (!updatedUsuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUsuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = usuarioCtrl;
