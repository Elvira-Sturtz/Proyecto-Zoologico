const cuidadorCtrl = {}  

 const Cuidador = require('../models/Cuidador')

// Obtener todos los Cuidadores
 cuidadorCtrl.getCuidadores = async(req, res) =>{
    try {
        const cuidadores = await Cuidador.find();
        res.json(cuidadores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

 } 

 //Crear Cuidador
 cuidadorCtrl.createCuidador = async(req, res) =>{   
    try {
        const { nombre, direccion, telefono, fechaIngreso } = req.body;

        const newCuidador = new Cuidador({
            nombre,
            direccion, 
            telefono, 
            fechaIngreso 
        });

        await newCuidador.save();
        res.status(201).json(newCuidador);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 }

 // Obtener Cuidador por ID 
 cuidadorCtrl.getCuidadorById = async(req, res) =>{               
    try {
        const cuidador = await Cuidador.findById(req.params.id);

        if (!cuidador) {
            return res.status(404).json({ message: 'Cuidador no encontrado' });
        }

        res.json(cuidador);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Eliminar Cuidador 
 cuidadorCtrl.deleteCuidador = async(req, res) =>{ 
    try {
        const deletedCuidador = await Cuidador.findByIdAndDelete(req.params.id);

        if (!deletedCuidador) {
            return res.status(404).json({ message: 'Cuidador no encontrado' });
        }

        res.json({ message: 'Cuidador eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

 // Actualizar Cuidador 
 cuidadorCtrl.updateCuidador = async(req, res) =>{  
    try {
        const { nombre, direccion, telefono, fechaIngreso  } = req.body;

        const updatedCuidador = await Cuidador.findByIdAndUpdate(
            req.params.id,
            { nombre, direccion, telefono, fechaIngreso  },
            { new: true }
        );

        if (!updatedCuidador) {
            return res.status(404).json({ message: 'Cuidador no encontrado' });
        }

        res.json(updatedCuidador);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
 } 

module.exports = cuidadorCtrl; 