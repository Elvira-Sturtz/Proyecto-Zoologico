const itinerarioCtrl = {}  /*objeto vacío*/ 

 const Itinerario = require('../models/Itinerario')

// Obtener todas los Itinerarios
 itinerarioCtrl.getItinerario = async(req, res) =>{
    try {
        const itinerarios = await Itinerario.find()
          .populate('zonas')

        res.json(itinerarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

 } 

 //Crear Itinerario
 itinerarioCtrl.createItinerario = async(req, res) =>{   
    try {
        const { codigo, duracion, longitud, maxVisitantes, zonas } = req.body;

        const newItinerario = new Itinerario({
            codigo, 
            duracion, 
            longitud, 
            maxVisitantes, 
            zonas
        });

        await newItinerario.save();
        res.status(201).json({ message: "Itinerario creado correctamente" } );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 }

 // Obtener Itinerario por ID 
 itinerarioCtrl.getItinerarioById = async(req, res) =>{               
    try {
        const itinerario = await Itinerario.findById(req.params.id)
            .populate('zonas')

        if (!itinerario) {
            return res.status(404).json({ message: 'Itinerario no encontrado' });
        }

        res.json(itinerario);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Eliminar Itinerario 
 itinerarioCtrl.deleteItinerario = async(req, res) =>{ 
    try {
        const deletedItinerario = await Itinerario.findByIdAndDelete(req.params.id);

        if (!deletedItinerario) {
            return res.status(404).json({ message: 'Itinerario no encontrado' });
        }

        res.json({ message: 'Itinerario eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Actualizar Itinerario 
 itinerarioCtrl.updateEItinerario = async(req, res) =>{  
    try {
        const { codigo, duracion, longitud, maxVisitantes, zonas } = req.body;

        const updatedItinerario = await Itinerario.findByIdAndUpdate(
            req.params.id,
            {  codigo, duracion, longitud, maxVisitantes, zonas  },
            { new: true }
        );

        if (!updatedItinerario) {
            return res.status(404).json({ message: 'Itinerario no encontrado' });
        }

        res.json(updatedItinerario);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 } 

module.exports = itinerarioCtrl; 