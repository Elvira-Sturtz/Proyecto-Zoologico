const cuidadorEspecieCtrl = {};

const CuidadorEspecie = require('../models/CuidadorEspecie');

// Obtener todas las relaciones Cuidador-Especie
cuidadorEspecieCtrl.getCuidadoresEspecies = async (req, res) => {
  try {
    const relaciones = await CuidadorEspecie.find()
      .populate('cuidador')
      .populate('especie');

    res.json(relaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear relación Cuidador-Especie
cuidadorEspecieCtrl.createCuidadorEspecie = async (req, res) => {
  try {
    const { cuidador, especie, fechaAsignacion } = req.body;

    const nuevaRelacion = new CuidadorEspecie({
      cuidador,
      especie,
      fechaAsignacion
    });

    await nuevaRelacion.save();
    res.status(201).json(nuevaRelacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener relación por ID
cuidadorEspecieCtrl.getCuidadorEspecieById = async (req, res) => {
  try {
    const relacion = await CuidadorEspecie.findById(req.params.id)
      .populate('cuidador')
      .populate('especie');

    if (!relacion) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    res.json(relacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar relación
cuidadorEspecieCtrl.deleteCuidadorEspecie = async (req, res) => {
  try {
    const deleted = await CuidadorEspecie.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    res.json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar relación (ej: cambiar fechaAsignacion)
cuidadorEspecieCtrl.updateCuidadorEspecie = async (req, res) => {
  try {
    const { cuidador, especie, fechaAsignacion } = req.body;

    const updated = await CuidadorEspecie.findByIdAndUpdate(
      req.params.id,
      { cuidador, especie, fechaAsignacion },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = cuidadorEspecieCtrl; 