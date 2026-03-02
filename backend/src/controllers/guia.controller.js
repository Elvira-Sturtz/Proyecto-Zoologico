const guiaCtrl = {}  

 const Guia = require('../models/Guia')

// Obtener todas los Guias
 guiaCtrl.getGuias = async(req, res) =>{
    try {
        const guias = await Guia.find();
        res.json(guias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

 } 

 //Crear Guia
 guiaCtrl.createGuia = async(req, res) =>{   
    try {
        const { nombre, direccion, telefono, fechaIngreso } = req.body;

        const newGuia = new Guia({
            nombre,
            direccion, 
            telefono, 
            fechaIngreso 
        });

        await newGuia.save();
        res.status(201).json({ message: "Guia creado correctamente" } );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 }

 // Obtener Guia por ID 
 guiaCtrl.getGuiaById = async(req, res) =>{               
    try {
        const guia = await Guia.findById(req.params.id);

        if (!guia) {
            return res.status(404).json({ message: 'Guia no encontrado' });
        }

        res.json(guia);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Eliminar Guia 
 guiaCtrl.deleteGuia = async(req, res) =>{ 
    try {
        const deletedGuia = await Guia.findByIdAndDelete(req.params.id);

        if (!deletedGuia) {
            return res.status(404).json({ message: 'Guia no encontrado' });
        }

        res.json({ message: 'Guia eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Actualizar Guia 
 guiaCtrl.updateGuia = async(req, res) =>{  
    try {
        const { nombre, direccion, telefono, fechaIngreso  } = req.body;

        const updatedGuia = await Guia.findByIdAndUpdate(
            req.params.id,
            { nombre, direccion, telefono, fechaIngreso  },
            { new: true }
        );

        if (!updatedGuia) {
            return res.status(404).json({ message: 'Guia no encontrado' });
        }

        res.json(updatedGuia);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 } 

module.exports = guiaCtrl; 