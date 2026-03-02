const guiaItinerarioCtrl = {};

const GuiaItinerario = require('../models/GuiaItinerario');

// Obtener todas las relaciones Guia-Itinerario
guiaItinerarioCtrl.getGuiasItinerarios = async (req, res) => {
  try {
    const relaciones = await GuiaItinerario.find()
      .populate('guia')
      .populate('itinerario');

    res.json(relaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear relación Guia-Itinerario
guiaItinerarioCtrl.createGuiaItinerario = async (req, res) => {
  try {
    const { guia, itinerario, hora } = req.body;

    const nuevaRelacion = new GuiaItinerario({
      guia,
      itinerario,
      hora
    });

    await nuevaRelacion.save();
    res.status(201).json(nuevaRelacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener relación por ID
guiaItinerarioCtrl.getGuiaItinerarioById = async (req, res) => {
  try {
    const relacion = await GuiaItinerario.findById(req.params.id)
      .populate('guia')
      .populate('itinerario');

    if (!relacion) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    res.json(relacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar relación
guiaItinerarioCtrl.deleteGuiaItinerario = async (req, res) => {
  try {
    const deleted = await GuiaItinerario.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    res.json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar relación (ej: cambiar hora)
guiaItinerarioCtrl.updateGuiaItinerario = async (req, res) => {
  try {
    const { guia, itinerario, hora } = req.body;

    const updated = await GuiaItinerario.findByIdAndUpdate(
      req.params.id,
      { guia, itinerario, hora },
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

module.exports = guiaItinerarioCtrl;